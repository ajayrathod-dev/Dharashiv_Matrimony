const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const port = 3001;

// Enable CORS
server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom login endpoint
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ email, password }).value();
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      token: `fake-jwt-token-${user.id}-${Date.now()}`,
      user: userWithoutPassword
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Custom register endpoint
server.post('/auth/register', (req, res) => {
  const db = router.db;
  const { email } = req.body;
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  const users = db.get('users').value() || [];
  const newId = String(users.length + 1);
  const profileId = `P${String(users.length + 1).padStart(3, '0')}`;
  const newUser = {
    id: newId,
    profileId,
    ...req.body,
    profileCompleteness: 50,
    isPremium: false,
    isVerified: true,
    isOnline: true,
    lastActive: new Date().toISOString(),
    memberSince: new Date().toISOString().split('T')[0],
    photos: req.body.photo ? [req.body.photo] : [],
    photo: req.body.photo || '',
    hobbies: req.body.hobbies || [],
    partnerPreferences: req.body.partnerPreferences || {},
    familyDetails: req.body.familyDetails || {},
    contactInfo: req.body.contactInfo || { phone: req.body.phone || '' }
  };
  db.get('users').push(newUser).write();
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    token: `fake-jwt-token-${newId}-${Date.now()}`,
    user: userWithoutPassword
  });
});

server.use(router);

server.listen(port, () => {
  console.log(`\n🚀 Dharashiv Matrimony Backend running at http://localhost:${port}`);
  console.log(`📦 JSON Database: db.json`);
});

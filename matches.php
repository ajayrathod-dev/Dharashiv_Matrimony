<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>Matches - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <header class="app-header">
        <a href="index.php" class="app-logo">
            <i class="fas fa-arrow-left" style="color: var(--text);"></i>
            <h1>Matches</h1>
        </a>
        <div class="header-actions">
            <div class="header-icon toggle-dark" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </div>
        </div>
    </header>

    <div class="section-header" style="margin-top: 10px;">
        <h3>Recommended for You</h3>
        <a href="#" id="openFilters">Filters</a>
    </div>

    <div class="list-container">
        <div class="match-card">
            <div class="match-img">
                <div class="premium-badge"><i class="fas fa-crown"></i> Prime</div>
                <img src="data:image/jpeg;base64,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" alt="Profile">
            </div>
            <div class="match-info">
                <h4>Neha S., 24</h4>
                <p>5'4", Pune • Engineer</p>
                <button class="btn-connect">Connect Now</button>
            </div>
        </div>

        <div class="match-card">
            <div class="match-img">
                <img src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&w=500&q=60" alt="Profile">
            </div>
            <div class="match-info">
                <h4>Priya K., 25</h4>
                <p>5'3", Mumbai • Doctor</p>
                <button class="btn-connect">Connect Now</button>
            </div>
        </div>

        <div class="match-card">
            <div class="match-img">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA6AMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAAIHAQj/xAA+EAACAQMDAQYDBgQFAwUBAAABAgMABBEFEiExBhMiQVFhFHGBIzJCkaGxBxUz0VJygsHwFjThJGKDksIX/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQQFBv/EACYRAAMAAgEDBAMAAwAAAAAAAAABAgMRIQQSMRMiQVEUMmEFM0L/2gAMAwEAAhEDEQA/AE0I6UWoyRQseRRQPK1noehnEMYwalIbGQaFVzxxUofw9KToYmRyo200vkQ7qPlbw0G7nfjFFILEmoWp3MQOaj00/D5eXgCmdyQZOaDurbvoSE4pV62wpXyg22vIp5cJzRr/ANJvlSfSLVrY5bmm5P2Z+RpPyNltrkpFyMXs3zrFG5gPepL1cXkuPMmvYFzKg966M/qCkWK1T7BAR5Uo1Qg3O0U9hXbAD5AVXLp+8vX9q5k+/qW/ofm4hGsCZ4HWj1QrhsY4qXs7aW95qkEF3MYYnbDPwPLOMnpVg7RadZae5itJzKAoOSQce3Fa7yLu7TJMNzsQQAu/GaIVSnB61PpM1hbrJNqD7VQZAHU49B5mleq9oIHBaxgI95P7A1EqqtJEelO9jVJXaPag4oJkKye+aUL2p1CyQrH8LtlGFd4csD7ZOP0oeTXbmWRgZog7c7u7wBRrDaF1kTH5LcgdPSpLKITXcUTtsDsF3HyyetJ9O1uKa4ihnZcyYAYDA3elONpSTny9aqk54IvstWv9mDpUaFLpJVZcqwGDVRkUr0OCPSjxeyzBImdiOnJ6Cnuv6JZW2iw3UE2ZGxkE+1Z1XY9P5Gtdy2imj72TUviXPP5VtCitOqnpkfvVy7S6Rptto0VxayZkIHGetMvIpaQERtbKhA3QnrU09xPc92ssjyBRhdxzgUOgwasmmaFFNoMesC7UlJtkkB/CCcA/OrpJckl7eisvEQeQaynWq20cLkKQayqmtrZHOmAx1OpwRzioUAqUDpWlgoMWTkZOam7wUKq81NhcdaBoJGO49BQ5I38gVMUHWhyg39atIoT63cPEB3I5zWmn3XeIBkk+dGalErDB5pOknwbHC8ZpORfIcvXI+BwanB8B+VLoLgSKr+tGxtlT8qSOTTKzer/6p+PM1lqAJ13cCluvajNBqDouMCgE1W5JGAM1tW+0W8iTOhTXESWzYb8NViAPJK7hcgnrmgkuZpY8TMeeoqSG+RODwBxx50np8Cmm38kzZXSWhh8UtseVc887cVJca1C0J2lgwH3COa9022m13MWn20kzDglV8I+ZpoP4Y3rxGW4nWKTaSEB860WscvkTKyNcFMlvnlkDTMQq5LNnPvxS+ZmiuGAk3qfFlTw1b31rPbag9lJgOr7cn1zXR+yH8PrG5iE2rl55GGVXdgD6UVZJhFTiq2c2WeWRyw3SP5bVJ+WKJNtfLb941rKqhcAsuK+ibfszpltAi21hEpRdvCjilGoaJaOrRsq5IOAcUt5mvgZOBNeT59tcieJn3bQwJx14NdJhkF0gli8SsMjFVftXocukXpBQbHJKEftV2/hvDadxai8O6Mx8BqrPSUdwES+7tYvJaNulSTzySIEZmIHQZpp2jt7ZNWdLLmMkBQPU1DqOi3ml3Cw3sJjZl3LznIpCc0lQbTT0hYgIYEVLcTSuiqxJUdOa3WMLcKGOORyegq2dpez1np2nRtb3AkDAEPUqpXkkyylqcVJFIUZWBIwM1G/FSRpnA9qN6AWyaWd5MEn9a9qBhtOKyhSCbJ1qXOcYqAHFbBsedahYaCa9Zwi7nOBQ4mVQN1RXM8c0ZUOMfOgYWwlbhHBCODmowWJpGHjhY+Mj61NDfsM7H34pat/KIG32cjNLprdZRipZL4TjDHmoROA3FLuk2HNLwz0Srb7YxTSFsrk+YpV3SvKrk/SmUJAGB6VTSXgbJSe0cO7UXNCRRrEucD60z13/AL9qVXMm3AFap5kz15Z7LOQNqnrRPZ/RrjX9RjtYA2wH7Vx0Uf3pUm6aZY1Iy7BR8zXYdK0/+QaFiwid2C5mePhmOPXyqZK7F/Q8Ud738F07O6TFounR2tuqwRKOQONx9T6mjLjYYSXmVEH4mYCuY2Vxd6vcxMtkYH3BeLpmPz9MCrZ2j0nUJtEg7hElkGS6vkrkew61mc6emak1rZQ+19hp6dqbG+huIZIJXPftG27DKN2ePPirFbdsp9PIVdCn7r8LysBx60h1TTdTltBc3sUSi0eN9qRlQo3YOPofOrBa9imux391eq8I5O9iSB6ben50dNLWwJltvQ41TtDqF7oTXOlFoAfC0iruKetUnTV72Z5Lmxub+Z+kkzlQM+YJI5roulrYWNlJBBJEIAm5ckc461GusaHYqL34aJlB29+qjCn3oYthVKKn2t0p59ERLlCrx7SpLbiB06/KhrO1S205XtyoiXCKEGCpwcg+/H61Y+12o293pUz27Bg8eVYcg5pVPqccujokQUtMAZML0HX881fLnQFaWxQzkybgTkHOaY6jrV9qjRtfzd40S7U4ApbEu+QL6nFWDXezEuk2cN20quJMAgDp50NOeEInfLK/IxLbjg1693M0SxM7FB0GelSpaXEsUkkcMjRxf1GVchfmaCf7wo9JgttGz4xTvUtVsb2SyNtZiB44RHLgDDEdKSN0reGJ3Zivl6VVpeWSW/gkunBkyK8qKUEHBrKteCNkjSDyoW7vkt8AkE+grMnHXmq5dyO1w+85wabdaQtscS6sCuGXilF3cSuhMDNnNaZVkUucAdaIJxGDEu73pUumXPIuX4uZgsjE+uaa6bG9urbjnmgxeKk22YbD70d38aw7lYH1ow0kTXw2KrRjk0Gbru2G/OKgudUDEKnUULNdSbxuAIIpdYlvYPBYrW+hlYBW5FM4JAW6+VVjSoVl+06HNWrR9Jvr5XeziMqJwxyBz6D1oWuR8N0isaqne6mV8upPtVbncu5IPnxVp1pWtp5+9BSRVIZSCNpqpnqPKtGHnYvJwN+z+ntdzLIsDssTZaQDgY6ZrseiXwhAEo8BweK43oOuahpQkh051UXJCsCuc54rpWkzOsAhueXQYNJ6hNNGrpXLRd/5xaqypYWUbysMHauOKH/6tsmjkg7i6jlQjCSx7CTSF9Na9RTaXk1u46iI43+x8/yqOWwcqYhp32mMF5HL59+aCdP5NHpphnaPXVuNE1O3uIxvW2kOf/btNVSLtRdP2cDjD7docZ96k7VdxofZs2MeBLNH3O5jkktwSfpmq3pqTw6VFdIrSRMuJVA8S46HHnTFCa2zNeTVdozsbW+7SXUl9HedwzDa4V+7HA5GKaaj2UeG1EKXsvesRlnyUC+ZyevFB2l7PP3ZstSjtQwAc7M/lR0l7Y2CPI+pXN5KeN0xGB18hTJ2nwU3OhZK0lhozWc0nEe9QT1PiNS6aSbKEt17sUncy6pPvfKwbsgHz+VP4oXXu1QZBGMdMY6c1KSSFadcoxRtbNHXur3l5bpBcTs8SfdU+VM7Hs78fYpMsxgmbOYyN4H14oS77O6lEcCDvR6xmqrBelTQpZZ25TN9E7Tz6Rp17YxW8csdypGWJBQkYz71XSOcZzippopIZCkyMjejDBrZrSRYxIVIU0L48l+fBCeRXQIrnQJdHt/gYFimSILOCuDux5+vnzVAcelbLcPGpXJANDc906Liu17ZJqcifEuEHGeKyg5G3HNZRTOloFvbA9RmMcZ29cVXneWaQ4B59qKDSbh4j9TRcYcoW7wggUN5v4PXT7+RetlJIPtMn5U9sjFHb92wxjzNQCWZBxMcY8xU6TXBGcgjnyoPydfAa6b+i7VVsZvvnxjpikiK/wAR3UTEr61bWllYdF2n2oaZun74qflJ8aI+l/olksmXDEZxWB1DjfE3Hng09ifnIALeQxRVsJfiI2IAJYADNV+Qm+UX+Lx5GPYjQhfSLduGW3TlQQMyMPbzFdBS9gaFmjOVj8TmIcj54qfS+zFrHbwSQ3z/ABipxJGw2LnnAX05+dTTaXLbvutZIvisZfMZQTexHIB980XpU+SRmxyu0SaxpNhrVu0l7YRStJGQr42k8ZHNVP8A/jF02ntMNSVbskFITH4Qp8ifM1ap1u7ZRtTFt3m2WEn+ic9fZc/lVv0hGt7WJt7NESVOeevmPanYNp6F9VppNHEbf+H97pXapY7kCSztpFcSHq/GRx8/2qz6tavDKJowOeDtFX/tNaEx/FxjJQeMAfh8jVWnKywksKRndd3I/pu3s4ElrfTQMpiYgjyAqXW+3E+lWXeTQBmPhUDzNSGGOPLAD51Uu3mnXl3DZG3hZtzthfXjr+9TFO65Lz32SVDVtYu9cvjPePkk+FB0UZ8qfabq7afZw286Du8c4xuwT1xQ3Zfs1dX98nfK0UK/eI5Ley+/7V1zT+ytvFY921kq7h1YZJ9ya2tJ8HMds5LfQRyXrSWZZYXI5Q8Fuv60dY6bbswklLSMPJ2yPyrTXdPvdN7QXVm2Ft2k3RHHBHkaLt1mUBmjYEcYHNLcXKH4rh+Q1Y1aUDgDoPKnFnA8sqRRjLdB7e9LrKGW6YBV25PJbgCrxodjHax5yT6serf+KPF09W+fBM3UzC9vka6bAIYk46Lge/vU4dZASSNnvQ91KRb4TgyeED51DO5nnMKZMMAG4D8beQ+g/X5GumpSWjlOtvZNPFbXWO+ijkUdC4BoTW7I39rsXuhIBnlcZqS5urbS4Pi9UuI4l8st4VJ9PU1Qdd/iNLPO9tosWxOgmkHiY+y+VZ88YX/sRs6XFnyf6/BrcWU8d33M0e2QnAHkak17RJ9IaMTkHeuciq9LrvaO5MLXLxMY23KxADdfP2qW97S6vqM8MOookrKcb1XBxXNuX3+x8HV/AzTjdXOjdqytAwblfr5kVlGc9rT0xEqSPy0Uuf8AIaJjVhGy7ZMkeSN/arBv544r2MkyCqrp19j11L+hIkLsMsJh/wDE39qlCOo8Jk+RQirIvFYwyOlLfTS/kJdS/oromZCUI2r7io1ubZ32Al39FFObqMAZxxSGxtXXWS5B2Gh/En7LfVV9BcksUSjMEgz54NG9n2gvdRSGaGVowCzHoBj1PpXmqKFQccVa/wCGOmwXUd5PMobZKi7D8s8/mKn40p+SPqaa8Dt76wUCS202+hQAZuLbIB99pyv6Uy02a4utklrrSTQsOFlj2yLj1qwKPCVK+H6VUu0WjCKZr7Tj3FwOSF4DVq7WjA3ssFlIl1dTI9spKqFaZ0wZPYijyiiIxquEAwFHGKquidoJ73TVlEWbiMkFD+IKfFg/LOKtMMokAYDggEflRrRXJo5MkQBx6c+dVu+0qNnYJmAt1GMr9KsxHOBUdwyW0ZklwQB0NVUKvIcZKjwUr+Sw27d5NI9w34VxhQfl50K8LSy/EOAR3bFeOPQft+tW+K1NwrTSrjvBhR/hX+9Ry2iMpwoAyAAB5CqUJeCVdU9sr+gaalncpIi5ZFOAo+8SSPyqx3FvNLFmWRlHlHGMAfM1rp8OZpGwchtvPt6UzlQ7Op+nSilC2cluLZpLqdNQZpz8VIis3VVB8P6Go7mxEGNpY5p3rUebq+24zFcAnHuin/evGjWe2SQCt6hdqM3c0yHRbXYMlct1yaskXCj3pZZsFAo+ORTKoLYx1yKJaXBT5CJm+3i5G2NS36UNb3qxruXmSWVjtHTA6k/8869um2IXOcPmNT70s0fTrmQSLN3cjryUjfdhTjr6DOKvuRTlgHb+5tX7Pbbsq0kzfYNtySR1K+g965zoo8U02AW27R59fOrF/Et5F1sLI25Y4lQcYweSRjy6iqpp0k8TSGCN5kC/aAdBXMz07tnrP8csfTRFW+PLDFM3fEHkDgio5pe/vlt++MSgZ3L1PtUKNcTPx9kinBLj7uay9QWN3GkSpJIGJMnXcuOtKQ3r/wDIy8Lxy3yGS25Sbu7YlQvG7d517SxrwtMe98bj8smsquw828jb5LjC0coyHX5VsCqPnDN8qUW+uaeMF9qkDHiU5ope0VkBhZfosZ/tWZ5eofwdP0sI3SVSOSB9a3AJ6EEUm/n9seQ7t/pxit/+oYwMRq5+v/mq7+oL7MAzlgZsHGR6V7GgByLcZpMe0DKclHP+oVv/AD/cmVjH+pxU7uo+GTtwfQyubKe5XiFse1dF7HaWbTRLddhiLDeVRRkn1YnzrnvZfULjWNdtbCOP7NyWkIb7qDkn9h9a7IpVQBwAOlP6ecm92ZupqO3UGsmVTnP+oY/UUj7Q36W1hcSyA/YoWIPJx/w09kbCcZwa5r24uXvNYtNIjkCxMN0yj8Qz4VPt1Naqa0ZNbNeyNndaoivJI0FigLYTjvOc4B9K6bbkLGMVXdHUQWgjCYOAB6Gn8J+z5NVK0Qmd1iUySHGBmlsKyalcd5IPsVPA9a2mWS+lCrkRA+v3qKkmjtEEaeXpREPbtgqd2nU8VEF27c9FGajiJkk3msupMRPjjIwKhR7o8TfCRuxwXyx+pzRVxGSpxIyn1FbW6iONU9MV7KRg+VWRlF1ZUOpXSFh3sihnUHjgYBHpx+1AaTINstvIOQcrUOoyr/1zqe09IYlOfI7c/sRQzT/D36SZ4J2t9eldDH+iMVfsNEDJKyEH5+lEsHjM0pU92j7AfU4/tQVzPtcMSPF7ULa3N5FoBjhnbeZHIJOSWyR1NZuqz+jp62aOnxepvksrXCXtsEtzuIblfME8Ubok9toplM5VZLg7PEQOc9K5zc67rVpJatLM04jlBKt7fL3FWV7yC5t4HkbxMd/i5KsfOsl9W3PtRqXTqXyw/tT2d03VNbEt4hYyBWODjJAB/KoNRt7a3jWO0to0UKylI4+CCPT51AmqSy6zFbuxkRATvI9qKmu44LnvJFVwM5DHrWrFc3jdShOXvTU0xP260KyvtUt57XdADBDG+yPjI4yR7VSZOybSXMZju9olXJZk+6PfmujyX0MtnLcQI0bK2Ad24L7486qatm7kuElBcykDK8t0PToOnWs2OdvbQ62mLJuxSRqkttfKZEbDZGQx9TnoPlWVYJPirVd5bawZi6MMAeox58dPKsrUscmZs5dKFkG5B4vOh8YPNN4oI8AsnhPzohbS0xkxofma5frzJ0JwP7EPTzxXqls8McU87ix8o4/pzWd3aA+GJfyq/wAhfQfoP7E4J/xHNbKSeNxp0iwdBCv5CvXWLB2ov6UDz7+A1hLz/BvTNqXuqPnLkQR58gOW/XH5V1MYCeJc/l/vXMNCfUDpdtZ2czWlpHndJHjfO+c7vYe1WcT3fdqsuoXJI/EuxSfngU1ZpQmunquRxfXK2ytIpKxj70bcbfce1clnnfUNYuL8S4JkynsB0ro2y3lhMUpMiMMMJDuz86AbszoLN9lbRxn0RmH7GqrKq0RdNSBdK7TxIixyopccZ3U+h7QQSqBnb7Ck57I6Pv3gSK3tIanTs7Zx/wBOaYD/AD5/2ovV+ifjjZ9digjCQjfI3Ax5VlqJZT3k7cnyoS10y2tzujYk+p5ovcpXAkb6VazIp9NQY0qxr1AqD4jvXX/CD1rS3tjKO8jVmX/Ec0wtERA3eojt5Bg2P2olVV4QHpzPlmj65p9u6JNcIm5toLsAP1qdbq3u4O+tJo5oz+ONtwoTUbW2uFLG0te+XJjPXn8qrVxaahp88l7ZWqRXHdFS0YVlb/MB8utH75fKKcRa9vBULu8EnbPWWBBzcBf/AKoq/wD5qfUgzKzA4OBiodO7NajeahNqay2qx3L97sLktzyegx1z51ZpOzgkt1VrtdxGT4PL866mP9Tl0n3MRNdm70wOn9SPqBUnZp5tT7y2MErRK28MAQAw8s4x9KfadoOn6dnAaZj94yHj8ulHzSbIXER2AE7QnGAflSs+JZZ0xuHI8b2hVq/ZRUm+3vVVHUEhVz3Z6gfM0uNo7NBFA4VyAHDqRsx+9WRJxK7xSAnJ5yeGFLh3fxuQAQo2Aj/esb6NY0mmaV1DttNA9naNBI95cBlnPhCnpjA5oW9mZ84bn1IyKNvLnfwucYxVf1G+NtLEkZHeyMBz5AmteLEsWPtRnyZHkybYVcQubeII0YVh9png5HOffke1J5EkadiVLbn6iXGOc7uh59vOrXawLdxpG7qML4nZuPzpCwxMPLqTkY/4ayOvca1PtJWEylzNO8ySeJsHHJI4P5V7XjyOEB2BhjnkGspqyMX6aOYLfEsCIx6Y3GpGuWZfugD5mh9Rs20+7MDnOPMVEG9DxWR45NHff2FC8ZRhVQV6L2UnAwB7ChFGW6E/KpEQhqjmQ06CvipscPXq3ErfjNWTst2F1DtAondxZ2J6SyLln/yr/uf1q8WX8K9Ei/7q5vLhvQMFH6VSxp/BHk0J+zGrGLT7ZUiklCRgNsUnJxRk3amJrvukimKL/WYL/THvVvW5t+ztnDY2mYIlxHAJrhQW8gAD1FK7mCXxpddmg6OSWMGBuz64IzSawtPgb61a2Kp9cKW9pLaxSSC58SAjgJ5E/vRNzrMVtChe4ha4OMRCTbn3Gc1HdXukmcW0mlXUMgUIYlZxtUDAGBx5Uvew7O3cyzTWepIyMCD4znH0paxthVdeRrDrJmV2SWMmPJdN3IA/Q0w0fWYprtpWkbuZk5BA+xx6epNV3UbDsxNCWnXUVwOSkbA49OFptY9qNDu9OFnp2ku+xREjfBGT5FuP3oa6a3/1oKc2+Gtr+DQ6hbXZ7hJO7kKlowZVBdgfOk03aCXT5Y0l8MruUwyg496e2ul91ax3FyumxowD+O3EeDjjoetCahoFvcR/EG20w24yXmVjx8s8UU9Nkn5CWePGuD0dpdXgHgWF0C5AKdaiftzqkBIfTbY48yGFLr3ULQRqltDcSxphFeGMtuH0GOKhk1SwuLYiPvcKcsGUgqfLOa2TtcbM9x/Bovb28dgDpkKHI6M396NTtZPOGAsGk8vAox+pNUZbq2dyqssaeu7GBnmrFp99aQ2slwZgLdFw0rE4x9Op+laEZ6nQVJqdtFsMNnJHKBgRR42gnHHHTrWzagyogliMPG1S7Drmt7ftF2emYLFJpwZ+CXjMe4+5KjJopptJW3SdrK0aFSVEiOCF46Zzx8qx5H1O9qlobOPEvMgi3U8/ed1DI+w4Yohb68VFJcNJ9gFcSuQFUggk0+sykChbPTXjKgDKMdyjqOd2RRFzqV7dK0BjMQB++Uxit0Zq7fd5MdYFsrL3SCX73jU7eKAjMsczHHEYyT13c01vbC51C5Q7LOCJW8bpFsbgeZHXNFNorpu2ozLkbd4HI88fT96u67ktAzPayv30giLytwAoY/lVdsbSXVdSadVLRR4kdj0Uc4z9am7V2Wpyz9za5mhXGYI/vE/70/0Ls3Ja2QFy5dpI1Y7X8O7zX6D9aJ5F2pAKH3bMuYxbxJHFMNsiqZMeLgHp+fNLvh0g3BMvsB8e8k5z16+maPuY/hdm8F0B8QfkevHvigblxHbGKR9iSjJwTh8Dge9AlyN7uOAWeKZoGkCTogc9Qvix+EcfXNe1kVywiWKMOYsjHmFOOCQfkaymdiA7mc9lY3b97P4n9axUUdFH5VlZXLps6aSN9xA4qXTYVutRtreXOyaVUfHXFZWVJIzuUDd0YIY1VYwgwoHHFHW9xIzBeMfKsrKjbTAaRtcWttPMss9tDJIh8LOgJHyo1HJHWvaytU+DO+TWa3juVKSg89SOtQ3enw3hi755sQnwhJCoPzx1rKyifkktkN1YrFbosc9woZwG+0zuHpzQFlpFsj3VmpkW2OD3akAZ+gzXlZVD4p6AZbOO5vJLdnlWO3+4Fc9PQg8Gl/anTodEtov5e0qLLuZkLkpk9SF6CvKyhaWh+K63rZYtBsbX+RJKYVZhFu59cdaCsNFsY9ajkjjK5XO3ORn617WUzS0KV1uuRhqul6aJTO2n2rTL0do+ak0zT7YW7MY1bAyAVGB+QrKyovIuv0BbzR7KOGacxtJkZ7t3JQH2FT6bcmeOSB4ohHEfCoXj9aysq15Df6DSJvsWwAArYAA8qE1N5Tpu+OV4nBB3R4z+teVlS/Bnx85BBayOd4Z2YF9pDE88Zotp5ZLEyM5zvK4zwBmsrKCA7XkU310yov2cRKvgMV58zVo0sKlj3IRdp5zjkHFZWUzSEMVapaQhCu3gMSPyqmXkzw20qJjCOu0kAlc88VlZRfIAJJdMoXwo3esUbOemPLmsrKymoh//2Q==" alt="Profile">
            </div>
            <div class="match-info">
                <h4>Anjali D., 23</h4>
                <p>5'5", Nashik • Teacher</p>
                <button class="btn-connect">Connect Now</button>
            </div>
        </div>
    </div>

    <div class="filter-fab" id="fabFilters" title="Open Filters">
        <i class="fas fa-sliders-h"></i>
    </div>

    <div class="filter-overlay" id="filterOverlay">
        <div class="filter-panel">
            <h3>Filters</h3>
            <div class="filter-row">
                <div>
                    <label>Age From</label>
                    <select>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                    </select>
                </div>
                <div>
                    <label>Age To</label>
                    <select>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                    </select>
                </div>
            </div>
            <div class="filter-row">
                <div>
                    <label>Height</label>
                    <select>
                        <option>5'2"</option>
                        <option>5'4"</option>
                        <option>5'6"</option>
                    </select>
                </div>
                <div>
                    <label>Caste</label>
                    <select>
                        <option>Any</option>
                        <option>Maratha</option>
                        <option>Brahmin</option>
                        <option>Kunbi</option>
                    </select>
                </div>
            </div>
            <div class="filter-row">
                <div>
                    <label>City</label>
                    <select>
                        <option>Any</option>
                        <option>Mumbai</option>
                        <option>Pune</option>
                        <option>Nashik</option>
                    </select>
                </div>
                <div>
                    <label>Verified Only</label>
                    <select>
                        <option>No</option>
                        <option>Yes</option>
                    </select>
                </div>
            </div>
            <div class="filter-actions">
                <button class="btn-outline" id="closeFilters">Close</button>
                <button class="btn-primary">Apply</button>
            </div>
        </div>
    </div>

    <nav class="bottom-nav">
        <a href="index.php" class="nav-item">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="matches.php" class="nav-item active">
            <i class="fas fa-user-friends"></i>
            <span>Matches</span>
        </a>
        <a href="mailbox.php" class="nav-item">
            <i class="fas fa-envelope"></i>
            <span>Mailbox</span>
        </a>
        <a href="chat.php" class="nav-item">
            <i class="fas fa-comment-alt"></i>
            <span>Chat</span>
        </a>
        <a href="profile.php" class="nav-item">
            <i class="fas fa-user"></i>
            <span>Profile</span>
        </a>
    </nav>

    <script>
        const toggleDark = document.querySelector('.toggle-dark');
        toggleDark?.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('mm_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
        if (localStorage.getItem('mm_theme') === 'dark') document.body.classList.add('dark');

        const overlay = document.getElementById('filterOverlay');
        const openBtn = document.getElementById('openFilters');
        const fab = document.getElementById('fabFilters');
        const closeBtn = document.getElementById('closeFilters');
        [openBtn, fab].forEach(el => el?.addEventListener('click', (e) => { e.preventDefault(); overlay.classList.add('show'); }));
        closeBtn?.addEventListener('click', () => overlay.classList.remove('show'));
        overlay?.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('show');
        });

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').catch(() => {});
        }
    </script>
</body>
</html>

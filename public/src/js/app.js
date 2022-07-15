let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('service worker registriert')
        })
        .catch(
            err => { console.log(err); }
        );
}

function displayConfirmNotification() {
    if('serviceWorker' in navigator) {
        let options = {
            body: 'You successfully subscribed to our Notification service!',
            icon: '/src/images/logo.jpg',
            image: '/src/images/flamingo.png',
            lang: 'de-DE',
            vibrate: [100, 50, 200],
            badge: '/src/images/logo.jpg',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: 'Ok', icon: '/src/images/logo.jpg' },
                { action: 'cancel', title: 'Cancel', icon: '/src/images/logo.jpg' },
            ]
        };

        navigator.serviceWorker.ready
            .then( sw => {
                sw.showNotification('Successfully subscribed (from SW)!', options);
            });
    }
}


function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function configurePushSubscription() {
    if(!('serviceWorker' in navigator)) {
        return
    }

    let swReg;
    navigator.serviceWorker.ready
        .then( sw => {
            swReg = sw;
            return sw.pushManager.getSubscription();
        })
        .then( sub => {
            if(sub === null) {
                // create a new subscription
                let vapidPublicKey = 'BEzPNFV-8NCohCWCMTePv6RPg2CpXEbkT96oV_kKrwbn8jb4bXOekSPjhqAHsfNGi9D4_tdZ90rllxcUlcakNHY';
                let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
                return swReg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidPublicKey,
                })
            } else {
                /* zum Testen, falls subscription bereits existierte,
             * aber neue erstellt werden soll
             */

                sub.unsubscribe()
                    .then( () => {
                        console.log('unsubscribed()', sub)
                    })
            }
        })
        .then( newSub => {
            return fetch('http://localhost:3000/subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newSub)
            })
                .then( response => {
                    if(response.ok) {
                        displayConfirmNotification();
                    }
                })
        });
}

function askForNotificationPermission() {
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {
            // displayConfirmNotification();
            configurePushSubscription();
        }
    });
}

if('Notification' in window && 'serviceWorker' in navigator) {
    for(let button of enableNotificationsButtons) {
        button.style.display = 'inline-block';
        button.addEventListener('click', askForNotificationPermission);
    }
}

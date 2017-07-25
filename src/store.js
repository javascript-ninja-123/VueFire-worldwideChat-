import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';


Vue.use(Vuex);


// =============== Firebase Stage ==================== //
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFnTeoDKnfv3J6Fdwpi3JstOSwaGkQuSw",
    authDomain: "thisdeomo.firebaseapp.com",
    databaseURL: "https://thisdeomo.firebaseio.com",
    projectId: "thisdeomo",
    storageBucket: "thisdeomo.appspot.com",
    messagingSenderId: "849736277199"
};
let app = firebase.initializeApp(config);
let rootRef = app.database().ref('users');
let chatRef = app.database().ref('chats');
let geoFire = new GeoFire(rootRef);
let ref = geoFire.ref();



// ====== offline and online check
const connectedRef = firebase.database().ref(".info/connected");
const userListRef = firebase.database().ref("USERS_ONLINE");
const myUserRef = userListRef.push();
var currentStatus = "★ online";
connectedRef.on("value", snap => {
    if (snap.val()) {
        // if we lose network then remove this user from the list
        myUserRef.onDisconnect()
            .remove();
    } else {
        setUserStatus(currentStatus);
    }
});
// Update our GUI to remove the status of a user who has left.
userListRef.on("child_removed", snap => {
    let snapshot = snap.val();
    let li = document.getElementById(`${snapshot.user}`)
    document.querySelector('.contentList').removeChild(li);
    let message = `<li>${snapshot.user} left</li>`
    document.querySelector('.contentList').insertAdjacentHTML('beforeend', message)
});
//  ===== offline ends here



//  =============== Firebase Stage ================= //
// ========== google maps ========== ///
// var map;

// function initialize(lat, long) {
//     var mapOptions = {
//         zoom: 8,
//         center: new google.maps.LatLng(lat, long),
//         mapTypeId: google.maps.MapTypeId.ROADMAP
//     };
//     map = new google.maps.Map(document.querySelector('.mapCanvas'),
//         mapOptions);
// }

// google.maps.event.addDomListener(window, 'load', initialize);

// function pan() {
//     var panPoint = new google.maps.LatLng(document.getElementById("lat").value, document.getElementById("lng").value);
//     map.panTo(panPoint)
// }

//globalDOm
var longitude;
var latitude;


export const store = new Vuex.Store({
    state: {
        welcome: 'Welcome!!!',
        title: 'WorldWide Chat',
        userArray: [],
        chat: [],
        enter: true,
        chatInput: '',
        LoginName: '',
        findGeo: (payload) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    // push data to rootRef
                    rootRef.push({
                        name: payload,
                        lat: latitude,
                        long: longitude,
                    })
                }, (err) => {
                    // error handling here
                })
            } else {
                console.error('Cannot access geolocation')
            }
        },
        setUserStatus: (name, status) => {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                let key = myUserRef.push().key;
                myUserRef.set({ user: `${name}`, status: status, key: key, lat: latitude, long: longitude });
            }, (err) => {
                console.log(err)
            })
        }
    },
    getters: {
        LoginName: state => {
            return state.LoginName;
        },
        userArray: state => {
            return state.userArray;
        },
        enter: state => {
            return state.enter;
        },
        chatInput: state => {
            return state.chatInput;
        },
        getChat: state => {
            return state.chat;
        }
    },
    mutations: {
        tellMap: (state, payload) => {
            let map = `<iframe id='${payload.key}' src="http://maps.google.com/maps?q=${payload.lat},${payload.long}&z=15&output=embed"></iframe>`;
            document.querySelector('.mapCanvas').insertAdjacentHTML('beforeend', map)
        },
        leaveMap: (state, payload) => {
            let map = document.getElementById(payload);
            document.querySelector('.mapCanvas').removeChild(map);
        },
        updateLoginName: (state, payload) => {
            state.LoginName = payload;
        },
        updateChatInput: (state, payload) => {
            state.chatInput = payload;
        },
        chatGetStarted: (state, payload) => {
            chatRef.push({
                    name: state.userArray[0].user,
                    content: payload
                })
                .then(() => {
                    state.chatInput = '';
                    chatRef.limitToLast(1).once('child_added', snap => {
                        let snapshot = snap.val();
                        state.chat.push({
                            name: snapshot.name,
                            content: snapshot.content
                        })
                    })
                })
        },
        getStarted: (state, payload) => {
            state.enter = false;
            state.LoginName = '';
            state.findGeo(payload);
            state.setUserStatus(payload, 'online');
            getCurrentUser();

            function getCurrentUser() {
                try {
                    rootRef.once('value')
                        .then(data => {
                            userListRef.on("child_added", snap => {
                                let snapshot = snap.val();
                                let userArray = state.userArray;
                                userArray.push({
                                    user: snapshot.user,
                                    status: snapshot.status,
                                    key: snapshot.key,
                                    lat: snapshot.lat,
                                    long: snapshot.long
                                })

                            });
                        })
                        .then(() => {
                            chatRef.orderByKey().once('value')
                                .then(snap => {
                                    let snapshot = snap.val();
                                    snap.forEach(val => {
                                        let snapshot = val.val();
                                        let name = snapshot.name;
                                        let content = snapshot.content;
                                        state.chat.push({
                                            name: name,
                                            content: content
                                        })
                                    })
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } catch (err) {
                    console.log(err)
                }
            }
            //getCurrentUser ends here
        }
    }
    //mutation ends here  
})
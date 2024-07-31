kiwi.plugin('avatars', (kiwi) => {
    kiwi.on('irc.join', (event, net) => {
        kiwi.Vue.nextTick(() => {
            updateAvatar(net, event.nick);
        });
    });

    kiwi.on('irc.wholist', (event, net) => {
        let nicks = event.users.map((user) => user.nick);
        kiwi.Vue.nextTick(() => {
            nicks.forEach((nick) => {
                updateAvatar(net, nick, false);
            });
        });
    });

    kiwi.on('irc.account', (event, net) => {
        kiwi.Vue.nextTick(() => {
            updateAvatar(net, event.nick, true);
        });
    });

    function updateAvatar(net, nick, _force) {
        let force = !!_force;
        let user = kiwi.state.getUser(net.id, nick);
        if (!user) {
            return;
        }

        if (!force && user.avatar && user.avatar.small) {
            return;
        }

        let url = (user.account) ?
            'https://www.example.org/registro/upload/avatar/' + user.account + '.jpg' :
            'https://www.example.org/profiles/noprofile.jpg';


        user.avatar.small = url;
        user.avatar.large = url;
    }
});

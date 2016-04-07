Meteor.publish('users', function (user) {
    
    let type = user.isAdmin;

    if (type) {
        var selector = {
            "profile.isAdmin": false
        };
    } else {
        var selector = {
            "profile.isAdmin": true
        };
    }

    let options = {
        fields: {
            emails: 1,
            profile: 1
        }
    };

    return Meteor.users.find(selector, options)
});

Meteor.publishComposite('chats', function () {
    if (!this.userId) return;

    return {
        find() {
                return Chats.find({
                    userIds: this.userId
                });
            },

            children: [{
                find(chat) {
                    return Messages.find({
                        chatId: chat._id
                    });
                }
            }, {
                find(chat) {
                    let query = {
                        _id: {
                            $in: chat.userIds
                        }
                    };
                    let options = {
                        fields: {
                            profile: 1
                        }
                    };
                    return Meteor.users.find(query, options);
                }
            }]
    };
});
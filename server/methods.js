Meteor.methods({

    newMessage(message) {
            if (!this.userId) {
                throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
            }

            check(message, {
                text: String,
                chatId: String
            });

            message.timestamp = new Date();

            message.userId = this.userId;

            let messageId = Messages.insert(message);
            message.viewed = false;
            let color = Meteor.users.findOne({_id: this.userId});
            message.color = color.profile.color;
            
        Chats.update(message.chatId, {
                $set: {
                    lastMessage: message
                }
            });

            return messageId;
        },
        viewed(chatId) {
            if (!this.userId) {
                throw new Meteor.Error('not-logged-in', 'Must be logged in to send message.');
            }

            check(chatId, String);


            let chat = Chats.findOne({
                _id: chatId,
                lastMessage: {
                    $exists: true
                }
            });
            if (chat) {
                if (!chat.lastMessage.viewed) {
                    Chats.update(chatId, {
                        $set: {
                            "lastMessage.viewed": true
                        }
                    });
                }
            }

        },

        updateName(name) {
            if (!this.userId) {
                throw new Meteor.Error('not-logged-in', 'Must be logged in to update his name.');
            }

            check(name, String);

            if (name.length === 0) {
                throw Meteor.Error('name-required', 'Must proive user name');
            }

            return Meteor.users.update(this.userId, {
                $set: {
                    'profile.firstName': name
                }
            });
        },

        newChat(otherId) {
            if (!this.userId) {
                throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
            }

            check(otherId, String);

            let otherUser = Meteor.users.findOne(otherId);

            if (!otherUser) {
                throw new Meteor.Error('user-not-exists', 'Chat\'s user not exists');
            }

            let chat = {
                userIds: [this.userId, otherId],
                createdAt: new Date(),

            };

            let chatId = Chats.insert(chat);

            return chatId;
        },

        removeChat(chatId) {
            if (!this.userId) {
                throw new Meteor.Error('not-logged-in', 'Must be logged to create a chat.');
            }

            check(chatId, String);

            let chat = Chats.findOne(chatId);

            if (!chat || !_.include(chat.userIds, this.userId)) {
                throw new Meteor.Error('chat-not-exists', 'Chat not exists');
            }

            Messages.remove({
                chatId: chatId
            });

            return Chats.remove({
                _id: chatId
            });
        },

        registrar(email) {
            check(email, String);

            var bnd = false;

            for (var x = 0; x < Meteor.settings.private.length; x++) {
                if (email === Meteor.settings.private[x].email) {
                    bnd = true;
                    break;
                }
            }

            let user = Meteor.users.findOne({
                "emails.address": email
            });

            if (bnd) {
                Meteor.users.update(user._id, {
                    $set: {
                        'profile.isAdmin': true
                    }
                });
            } else {
                Meteor.users.update(user._id, {
                    $set: {
                        'profile.isAdmin': false
                    }
                });
            }
        }
});
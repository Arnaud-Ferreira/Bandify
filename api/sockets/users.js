let membersOnline = [];

const addMemberOnline = (userId, socketId) => {
    // Lors d'une connection front, je vérifie si l'utilisateur est déjà dans le tableau des utilisateurs connectés
    const alreadyConnected = membersOnline.find((m) => userId === m.id);
    
    if(alreadyConnected) return membersOnline;
    if(!userId) return;
        const member = {
            id: userId,
            socketId: socketId,
        }
        membersOnline.push(member);
        return membersOnline;


};

const removeMemberOnline = (socketId) => {
    const filteredMembersOnline = membersOnline.filter((m) => m.socketId !== socketId);
    membersOnline = filteredMembersOnline;
    return membersOnline;
};

const findUserOnline = (userId) => {
    const foundUser = membersOnline.find((m) => Number(m.id) === userId);
    if(foundUser) return foundUser;
    return;
}

module.exports = { addMemberOnline, removeMemberOnline, findUserOnline };
// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

ownsProposal = function(member_id, proposal) {
  return doc && proposal.initiator === member_id;
}

authMember = function(member) {
  return member && member.user_id === Meteor.userId;
} 

userkbzs = function(userId) {
  console.log(userId);
  kbzsid = 0;
  if (userId) {
    var ber = Meteor.users.findOne(userId).memberships;
    var memberships = Members.find({'_id' : {$in : ber}}).fetch() ;
    kbzsid = _.map(memberships,function(m) { return m.kbz_id});
  }
  return kbzsid;
}


// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

ownsProposal = function(member_id, proposal) {
  return doc && proposal.initiator === member_id;
}
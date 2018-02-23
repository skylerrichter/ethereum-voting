pragma solidity ^0.4.18;

contract Voting {
  
  /*
  A mapping field is similar to an associative array or object hash. The mapping key is the candidates name stored as bytes32 and the value is uint8 to store the vote count.
  */
  mapping(bytes32 => uint8) public votesReceived;

  /*
  An array of bytes32 to store the list of candidates.
  */
  bytes32[] public candidateList;

  /*
  Get the voting candidates.
  */
  function getCandidateList() constant returns (bytes32[]) {
    return candidateList;
  }

  /*
  The constructor will only be called once when the contract is deployed. When we deploy the contract we will pass an array of candidates who will be contesting in the election.
  */
  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  /*
  Returns the total votes a candidate has received so far.
  */
  function totalVotesFor(bytes32 candidate) view public returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  /*
  Increment the vote count for a given candidate.
  */
  function voteForCandidate(bytes32 candidate) public {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
  }

  /*
  Determine if a given candidate exists.
  */
  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }
}
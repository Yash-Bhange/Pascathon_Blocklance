// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract IdentityManagement
{

    address public ContractOwner;
    
    constructor() public {
        ContractOwner = msg.sender;
    }

    struct UserInfo{
		string FullName;
		string EmailID;
		uint MobileNo;
    }
    
    struct UserDL{
		string DL_No;
		string DL_Name;
		string DL_DOB;
		string DL_Hash;
		string DL_Address;
    }
    struct DLRequest{
		string RequestedBy;
		uint DL_No;
		uint DL_Name;
		uint DL_DOB;
		uint DL_Hash;
		uint DL_Address;
		uint DL_OverAll_Status;
    }
     /*
            ApprovalStatus
        -------------
        0 --  default status
        1 --  Requested
        2 --  Approved
        3 --  Rejected
    */
   
  

    mapping(address => UserInfo[]) UserMap;
	mapping(address => UserDL[]) UserDLMap;
    mapping(address => DLRequest[]) DLRequestMap;
    mapping(address=>string) public checkFI;



    function addFI(address FIaddress,string memory FIname)public{
        checkFI[address(FIaddress)]=FIname;
    }
	
	
    function AddUser(address UserAddress,string memory FullName,string memory EmailID,uint MobileNo) public
    {
        UserMap[UserAddress].push(UserInfo(FullName,EmailID,MobileNo));
    }

    function AddUserDL(address UserAddress,string memory DL_No, string memory DL_Name, string memory DL_DOB, string memory DL_Hash, string memory DL_Address)public
    {
        UserDLMap[UserAddress].push(UserDL(DL_No, DL_Name, DL_DOB, DL_Hash, DL_Address));
    }

     function AddDLRequest(address UserAddress,string memory RequestedBy, uint DL_No, uint DL_Name, uint DL_DOB, uint DL_Hash, uint DL_Address, uint DL_OverAll_Status)public
    {
        DLRequestMap[UserAddress].push(DLRequest(RequestedBy, DL_No, DL_Name, DL_DOB, DL_Hash, DL_Address, DL_OverAll_Status));
    }
     function ViewDLRequestLength(address UserAddress) public returns(uint)
    {
        return DLRequestMap[UserAddress].length;
    }





    function viewUser(address UserAddress, uint UserIndex) public returns(string memory FullName,string memory EmailID,uint MobileNo)
    {
        UserInfo memory ThisUser=UserMap[UserAddress][UserIndex];
        return (ThisUser.FullName, ThisUser.EmailID, ThisUser.MobileNo);
    }

   

}

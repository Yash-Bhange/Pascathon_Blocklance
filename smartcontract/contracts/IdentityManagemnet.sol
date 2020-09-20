// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract IdentityManagement
{

    address ContractOwner;
    
    constructor()public {
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
		bytes DL_Hash;
		string DL_Address;
    }

   
  

    mapping(address => UserInfo[]) UserMap;
	mapping(address => UserDL[]) UserDLMap;
	
	
    function AddUser(address UserAddress,string memory FullName,string memory EmailID,uint MobileNo) public
    {
        UserMap[UserAddress].push(UserInfo(FullName,EmailID,MobileNo));
    }

    function AddUserDL(address UserAddress,string memory DL_No, string memory DL_Name, string memory DL_DOB, bytes memory DL_Hash, string memory DL_Address)public
    {
        UserDLMap[UserAddress].push(UserDL(DL_No, DL_Name, DL_DOB, DL_Hash, DL_Address));
    }




    function viewUser(address UserAddress, uint UserIndex) public returns(string memory FullName,string memory EmailID,uint MobileNo)
    {
        UserInfo memory ThisUser=UserMap[UserAddress][UserIndex];
        return (ThisUser.FullName, ThisUser.EmailID, ThisUser.MobileNo);
    }

   

}

---
title: Access user contact information in code
permalink: /wpcrm/code/user-contact-information-in-code
sidebar_position: 22
---

Sometimes it’s required to access information about the currently logged-in user in PHP. It can be easily done by using `Identity` class that has static `auto` method that returns the current user identity information including the linked CRM record (if available).

Once the contact is retrieved, PHP CRM toolkit can be used to access additional information. Connection required by the toolkit is provided by the plugin via global `ASDK()` function.

```
use AlexaCRM\CRMToolkit\Entity;
use AlexaCRM\WordpressCRM\Identity;  

// Get current user
$user = Identity::auto();

// Check if logged in. Note: we assume that user is bound to contact entity in CRM
if( $user->loggedIn() ) {
  $contact = $user->getEntity();
  
  // get parent account reference and retrieve the account number
  $accountRef = $contact->parentcustomerid;
  $account = ASDK()->entity( 'account', $accountRef->Id );
  $accNum = $account->accountnumber;
}
```
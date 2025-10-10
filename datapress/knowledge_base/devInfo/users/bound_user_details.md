---
title: Accessing bound user contact details
sidebar_position: 25
slug: /knowledge-base/bound-user-details
tags:
    - Knowledge base
    - DataPress
    - Retrieve
    - User Binding
---

If you need to access information about the currently logged-in user in PHP. It can be easily done by using **UserService** class that has methods to return the current user information including the linked CRM record (if available).

Once the bound contact is retrieved, **WebApiClient** class can be used to access additional information. Connection required for the toolkit to work properly is provided by the **ConnectionService** class.

```php
use AlexaCRM\Nextgen\ConnectionService;
use AlexaCRM\Nextgen\UserService;
use AlexaCRM\Xrm\ColumnSet;
use AlexaCRM\Xrm\EntityReference;

$userService = UserService::instance();

if ($userService->isBound()){
    $contact = $userService->getBoundRecord();

    /** @var EntityReference $accountRef */
    $accountRef = $contact['parentcustomerid'];
    $account = ConnectionService::instance()->getClient()->Retrieve('account', $accountRef->Id, new ColumnSet(true));
    $accountNum = $account['accountnumber'];
}
```

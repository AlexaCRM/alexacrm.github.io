---
title: Date and Time columns
sidebar_position: 4
slug: /date-and-time
tags:
    - DataPress
    - Date
    - Time
---

## Overview
When working with date and time values, you can customize how they are displayed to users and how they are adjusted for different time zones. Here are the behavior options available in Dataverse and model-driven apps:

- **User Local**: Adjusts values based on the user’s time zone. 
- **Time Zone Independent**: No time zone conversion is applied.
- **Date Only**: Displays only the date portion without time zone conversion.

For more details, refer to the [Microsoft Dataverse Date and Time documentation](https://learn.microsoft.com/power-apps/maker/data-platform/behavior-format-date-time-field).

## Advanced Configuration
To configure advanced settings for date and time fields, navigate to the **DataPress Admin Area** and open the **Settings tab**. At the bottom of the page, you will find the `ICDS_DATETIME_VALUE` Advanced settings. Options available:

- **Legacy**
- **UTC**
- **Local**

This setting affects the behavior of **User Local** fields.  
More details: [Read more about settings](/administration/troubleshooting/#advanced-settings)

---

## Usage Scenarios

### **User Local (Date and Time)**
#### **Scenario: Scheduling Appointments**
A global organization allows employees to book meetings via a Dataverse-based scheduling system. Each user must see the appointment time in their local time zone.

- **Behavior:** "User Local" ensures that a meeting scheduled for **3 PM UTC** appears as:
    - **11 AM** for a user in **New York (UTC-4)**
    - **4 PM** for a user in **London (UTC+1)**

- **Why is this important?** It prevents confusion about meeting times across different time zones, ensuring users view appointments correctly in their own local time.

---

### **User Local (Date Only)**
#### **Scenario: Employee Vacation Tracking**
A company tracks employee vacation start dates in Dataverse. The dates should be seen relative to the user's location, but the exact time is irrelevant.

- **Behavior:** "User Local" with Date Only format stores the vacation start date in UTC but adjusts for local time zones.

- **Why is this important?** If the company operates in multiple countries, employees should see their vacation start date correctly. However, this may cause unintended shifts if different users access the same data from different time zones.

---

### **Time Zone Independent (Date and Time)**
#### **Scenario: Hotel Check-in Time**
Hotels worldwide may set check-in times as **3 PM local time**. Regardless of where the booking staff or customer accesses the data, it must always show **3 PM** for all users.

- **Behavior:** "Time Zone Independent" stores the exact check-in time as **3 PM** in the hotel's time zone, without any conversion.

- **Why is this important?** Ensures a consistent experience for customers booking from different time zones—everyone sees the same check-in time.

---

### **Time Zone Independent (Date Only)**
#### **Scenario: Warranty Expiration Date**
A company records product warranty expiration dates that should remain the same worldwide, regardless of the customer's location.

- **Behavior:** "Time Zone Independent" with Date Only ensures that all users, no matter where they are, see the **exact same expiration date** without time zone adjustments.

- **Why is this important?** Prevents discrepancies in warranty periods across different regions.

---

### **Date Only (No Time Stored)**
#### **Scenario: Birthday Reminder**
A user’s birthday is an event that doesn’t depend on a specific time zone—it’s just a date.

- **Behavior:** "Date Only" ensures the birthday is stored as a pure date without any time component, eliminating adjustments based on the user’s time zone.

- **Why is this important?** Keeps birthdays consistent for all users worldwide, preventing shifts due to time zone conversions.

---

## **Key Considerations**
- If **time matters**, use **User Local** or **Time Zone Independent (Date and Time)**.
- If **only the date is important**, use **Date Only** or **Time Zone Independent (Date Only)**.
- Avoid **User Local (Date Only)** unless you want time zone conversions to affect the stored date.

[More details for twig](/twig/examples/#working-with-date-columns)

[More details for view](/views/#how-to-display-date-or-date-time-column)

[More details for custom forms](/forms/custom-forms-notes/#datetime-fields-in-custom-forms)

[More details for Elementor](/addons/elementor/#how-to-create-a-field-for-a-date-time-column)

[More details for Gravity forms](/addons/gravity-forms/#date-and-time-columns)

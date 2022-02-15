1.0.4

## [Unreleased] - 2021-12-08
---------------------------------------------------

Added:
- LOGIN AUTHENTICATION CODE: MAYOR [ticket name - additional resend code validation].

Changed:-

Fixed: -
    
## [1.0.4] - 2022-02-15
---------------------------------------------------

Changed:
- apiService/js --> additional param 'user' to get client and site on methode getSummaryData

Fixed:
- STOCK HOLDING SUMMARY: MINOR [NO TICKET - Filter Site and Client is not working].


## [1.0.3] - 2022-02-14
---------------------------------------------------

Changed:
- PurchaseOrder/create/service.js --> complete the parameters in method changeOrderDetails
- SalesOrder/create/service.js --> complete the parameters in method changeOrderDetails
- SalesOrder/create/Form.jsx --> additional new methode 'changeOrderDetailSiteAndClient'
- OurchaseOrder/create/Form.jsx --> additional new methode 'changeOrderDetailSiteAndClient'

Fixed:
- PURCHASE ORDER CREATE BUTTON: MINOR [NO TICKET - missing parameter for regular user in changeOrderDetails methode]
- PURCHASE ORDER CREATE BUTTON: MINOR [NO TICKET - page become blank afer click Create Purchase Order button]
- PURCHASE ORDER CREATE MODAL: MINOR [NO TICKET - client missing]
- SALES ORDER CREATE BUTTON: MINOR [NO TICKET - missing parameter for regular user in changeOrderDetails methode]
- SALES ORDER CREATE BUTTON: MINOR [NO TICKET - page become blank afer click Create Purchase Order button]
- SALES ORDER CREATE MODAL: MINOR [NO TICKET - client missing]


## [1.0.2] - 2022-02-11
---------------------------------------------------

Changed:
- apiService/js --> additional param 'user' to get client and site on methode getStockMovement
- dropdown/index.js --> additional new variable 'staticClient' to accommodate client for API URL of getProduct methode

Fixed:
- STOCK MOVEMENT SUMMARY: MINOR [NO TICKET - Filter Site and Client is not working].
- STOCK MOVEMENT SUMMARY: MINOR [NO TICKET - Product not showing after input 3 char]

## [1.0.1] - 2021-12-07
---------------------------------------------------
Here we would have the update steps for 1.0.1 for people to follow.

Added:

Changed:

Fixed:

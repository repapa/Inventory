Travel Store Setup Guide
===================

Sprint 0 - Preparation time: 1 week
-------------

### 1) At first, we need to identify the developers
- Each entity needs **1 - 2 developers** (depends on the number of customized components).
- Required skills:
  - [ReactJs](https://facebook.github.io/react/)
    - [Redux](http://redux.js.org/docs/introduction/)
    - [Grid](https://github.com/zoover/react-grid-system)
    - [React Bootstrap](react-bootstrap.github.io/)
  - [ExpressJs](http://expressjs.com/)
  - [Strongloop / Loopback](https://loopback.io/)
  - [Git](https://github.com/)
- Each developer needs **one AXA email**.
- Each developer needs Flowdock / Slack account.

### 2) Create JIRA and Confluence page:
- Request [Customer Support](https://axagroupsolutions.atlassian.net/servicedesk/customer/portal/5/create/30) to create **JIRA** and **Confluence page**.

### 3) Request for LDAP and Contento v4 account
- Request [Customer Support](https://axagroupsolutions.atlassian.net/servicedesk/customer/portal/5/create/30) to create **LDAP** and **Contento** account using **AXA email**.

### 4) Then, lets create our projects:
- Request [Customer Support](https://axagroupsolutions.atlassian.net/servicedesk/customer/portal/5/create/30) for **Github repositories** for these projects:
  - ecommerce-frontend-[entity]
  - ecommerce-middleware-[entity]
  - ecommerce-quotation-[entity]
- Fork these project from:
  - [ecommerce-travel-frontend](https://github.com/AXA-GROUP-SOLUTIONS/ecommerce-travel-frontend)
  - [ecommerce-middleware](https://github.com/AXA-GROUP-SOLUTIONS/ecommerce-middleware)
  - [ecommerce-quotation](https://github.com/AXA-GROUP-SOLUTIONS/ecommerce-quotation)

### 5) After having these project pushed to Git, lets request for servers:
- Request [CAMP Support](https://axagroupsolutions.atlassian.net/projects/AXAXX/issues) for **Servers** - including **UAT** and **Production** for these projects:
  - ecommerce-frontend-[entity]
  - ecommerce-middleware-[entity]
  - ecommerce-quotation-[entity]
- Total: **6 servers**
- Also Request [CAMP Support](https://axagroupsolutions.atlassian.net/projects/AXAXX/issues) for **Jenkins** and **Cloudbees** jobs for these servers.

### 6) Request for Tag Commander
- Contact [Nicolas]() for **tag plan**. Please let him know that you start a **Travel project** for [Entity].

### 7) Deploy to UAT and PROD. Yes, deploy ASAP, right before any development!
- Please read [How to deploy using Jenkins and Cloudbees]() for more details.

### 8) Obtain SSL certificate for Production

### 9) Lets start discussion with Penetration test vendor and Olivier to identify Pen-test date.
- Based on the [development time](), identify pen-test date.
- For Penetration test, please fill out the [Penetration test form]() and send it to [Pen-test vendor]().
- Also need to discuss with [Olivier]() for AWS approval.

---

Development time: 1 - X weeks
-------------

- The length of this development time depends on the number of customized components and number of developers. Please read [How to customize component](https://github.com/AXA-GROUP-SOLUTIONS/ecommerce-travel-frontend/blob/master/docs/How_To_Customize_Components.md).
- Every new component need to have **unit test** along with it. **Acceptance test** also needed to be revised. Please read [How to add unit test](), and [How to modify Acceptance test]().
- We also need to setup Contento for business related contents:
  - Please read [How to use Contento V4]() for more details.
  - Mask and Content can be reused from Core project.
- And also need to setup Confluence for hard coded contents:
  - Please read [How to use Confluence for Multi-lang content]().
  - Create a Confluence page similar to [this page]().
  - Copy all the keywords from the above page and put in your Confluence page.
- Last but not least, we need to setup [Tag Commander]() with provided **tag plan** from Nicolas.
- **Need to follow up with Pen-test vendor and Olivier to identify Pen-test date**.

---

Pen-testing time: 2 weeks
-------------

- At this point, development is done and code is frozen. Also, request to AWS is also approved.
- Penetration test will take place in **2 weeks** - no coding in this period of time.

---

After Penetration test: 0 - X weeks
---

- If there is no customized component, the result is expected to be no finding - which means we can push the code to production and starting go Live!
- If there are some customized components, we **might** have some findings in our tests:
  - If no medium and high risk: we can go Live and [fix the findings]() later!
  - If there is medium or high risk: we need to [fix the findings]() before going Live :(
- Fix the findings:
  - Define the number of risks
    - If many risks were found, we can aim to fix high and medium risks first.
  - We need to ask for AWS approval again from [Olivier]().
  - Contact with Pen-test vendor to identify the **re-validation** date.
  - After **re-validation** and no high or medium risks are found, we can go Live!

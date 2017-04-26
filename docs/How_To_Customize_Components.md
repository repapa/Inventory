How To Customize Components
===================

### Structure of project:
```
- container (page)
	- components
	- customized components (unique for each entity)
```
Some examples:

- Containers:
	- TravelInsurance
	- CustomerDetails
- Components:
	- Region
	- NumberOfAdult
	- ArrivalDate

### Where to edit?
- Style: src/style/_variables.scss
- Rules: src/constants/rules.js

### Sequence diagram
```sequence
Components->Validator: Submit form
Validator-->Components: Validate Failed, return with error fields
Validator-->Dispatch: Validate Success
```

### I want to add / remove a component, what to do?
- Add / remove your component in `./src/[PageName]/[PageName].js`.
- Edit Validation rules in `./src/lib/validator.js`.
- You're all set.

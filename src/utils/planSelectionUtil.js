export function getSelectionData(plan) {
  const selectedPlan = Object.assign({}, plan);
  let selectedAddons = [];

  if (selectedPlan.addOns &&
  selectedPlan.addOns.length > 0) {
    selectedAddons = selectedPlan.addOns.filter(addOn =>
      addOn.selected).map(addOn => addOn.addOnId);
  }

  delete selectedPlan.addOns;
  delete selectedPlan.fee;
  
  selectedPlan.addOnIds = selectedAddons;
  return selectedPlan;
}
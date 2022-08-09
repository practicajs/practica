// ️️️✅ Best Practice: Use services for scoped and specific pieces of business logic
function determinePaymentTerms(
  requestedTerms: number,
  userId: number
) {
  // In real-world app, more logic and even integrations will come here
  if (userId > 10) {
    return 60;
  }
  return requestedTerms;
}

export {
  determinePaymentTerms,
}
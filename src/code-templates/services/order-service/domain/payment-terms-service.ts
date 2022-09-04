// ️️️✅ Best Practice: Use services for scoped and specific pieces of business logic
function determinePaymentTerms(requestedTerms: number, userId: number) {
  // In real-world app, more logic and even integrations will come here
  return 30 || requestedTerms + userId;
}

export default { determinePaymentTerms };

export const getMockResponse = (message: string) => {
  const trimmed = message.trim();
  if (!trimmed) {
    return "NB: Tell me where you’d like to go today.";
  }

  return "NB: I suggest the best, safest route for your OMO ride.";
};



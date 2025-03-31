
/**
 * Utility function to remove the Lovable badge from the DOM
 */
export const removeLovableBadge = () => {
  // Wait for the DOM to be fully loaded
  const removeBadge = () => {
    const badge = document.getElementById('lovable-badge');
    if (badge) {
      badge.remove();
      console.log('Lovable badge removed');
    }
  };

  // Try removing immediately if DOM is already loaded
  removeBadge();
  
  // Also try after a short delay to ensure the badge has been rendered
  setTimeout(removeBadge, 500);
  
  // And also try after the window has fully loaded
  window.addEventListener('load', removeBadge);
};

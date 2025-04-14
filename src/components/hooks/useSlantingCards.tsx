// ScrollHook.ts
import { useEffect, useRef } from 'react'

export function useSlantingCards() {
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      
      if (cards.length < 2) return;
      
      cards.forEach((card, index) => {
        if (index === 0) return; // Skip first card
        
        const rect = card.getBoundingClientRect();
        const previousCard = cards[index - 1];
        const previousRect = previousCard.getBoundingClientRect();
        
        const stackingThreshold = 100;
        
        if (rect.top <= previousRect.bottom + stackingThreshold) {
          card.classList.add('stacked');
        } else {
          card.classList.remove('stacked');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const setCardRef = (element: HTMLElement | null, index: number) => {
    cardsRef.current[index] = element;
  };
  
  return { setCardRef };
}
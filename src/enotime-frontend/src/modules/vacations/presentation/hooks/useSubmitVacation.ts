import { useState } from 'react';

/* =========================================
   Interfaces & Types
   ========================================= */
export interface VacationRequest {
  employeeId: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

/* =========================================
   Hook: useSubmitVacation
   ========================================= */
export const useSubmitVacation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Submits the vacation request to the backend.
   * Currently mocked to simulate a network delay.
   */
  const submitVacation = async (requestData: VacationRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Inject Hexagonal Infrastructure Adapter here (e.g., ApiVacationRepository)
      
      // Simulating network request delay (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Request successfully submitted to the server:', requestData);
      return requestData;
      
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Failed to submit vacation request.');
      throw err;
      
    } finally {
      setIsLoading(false);
    }
  };

  return { submitVacation, isLoading, error };
};
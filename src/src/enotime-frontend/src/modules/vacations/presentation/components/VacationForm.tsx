import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select } from 'antd';
import { Input } from 'react_ui_library_enovate'; 
import { useSubmitVacation } from '../hooks/useSubmitVacation';

const { Option } = Select;

/* =========================================
   Interfaces & Types
   ========================================= */
interface VacationFormData {
  requestType: string;
  requestedDays: number;
}

/* =========================================
   Component: VacationForm
   ========================================= */
export const VacationForm: React.FC = () => {
  // Hexagonal Architecture hook injection
  const { submitVacation, isLoading } = useSubmitVacation();

  // React Hook Form initialization
  const { 
    register, 
    handleSubmit, 
    control, 
    formState: { errors } 
  } = useForm<VacationFormData>({
    defaultValues: {
      requestType: '',
      requestedDays: undefined
    }
  });

  /* Submit Handler */
  const onSubmit = async (data: VacationFormData) => {
    try {
      await submitVacation({
        employeeId: 'EN-0287',
        startDate: '2026-06-10', // Simplified for example
        endDate: '2026-06-14',
        days: Number(data.requestedDays),
        status: 'Pending'
      });
      // Optionally trigger success notification
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <form 
      className={`vacation-form ${isLoading ? 'vacation-form--loading' : ''}`} 
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="vacation-form__header">
        <h2 className="vacation-form__title">New Time-Off Request</h2>
        <p className="vacation-form__subtitle">Submit your vacation or compensatory days</p>
      </div>

      <div className="vacation-form__grid">
        
        {/* =========================================
            FIELD: Request Type (Enovate Select Standard)
            ========================================= */}
        <Controller
          name="requestType"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <div className="w-full relative">
              <Select
                {...field}
                value={field.value || undefined}
                className={fieldState.invalid ? "select-error-global" : ""}
                placeholder=" "
                style={{ width: '100%' }}
              >
                <Option value="vacation">Vacation Days</Option>
                <Option value="compensatory">Compensatory Time</Option>
              </Select>
              
              {/* Floating label logic inherited from _antDesign.scss */}
              <label>Request Type *</label>
              
              {fieldState.error && (
                <p className="utils__error-msg">
                  This field is required
                </p>
              )}
            </div>
          )}
        />

        {/* =========================================
            FIELD: Requested Days (Enovate Input Standard)
            ========================================= */}
        <div className="utils__input-container relative w-full mb-2">
          <Input
            type="number"
            label="Requested Days *"
            placeholder=" "
            componentClassName="utils__input-reverse-wrapper"
            invalid={errors?.requestedDays?.message || (errors?.requestedDays ? "Invalid number" : undefined)}
            disabled={isLoading}
            {...register("requestedDays", { 
              required: "This field is required", 
              min: { value: 1, message: "Minimum 1 day" },
              max: { value: 15, message: "Maximum 15 days" }
            })}
            onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { 
              if (e.key === "-" || e.key === "e") e.preventDefault(); 
            }}
          />
        </div>

      </div>

      {/* =========================================
          FORM ACTIONS
          ========================================= */ }
      <div className="vacation-form__actions">
        <button 
          type="button" 
          className="utils__btn-cancel"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn-1"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};
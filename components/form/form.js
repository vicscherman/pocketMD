import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/common/Button';
import { motion } from 'framer-motion';
import LocationInput from '../common/LocationInput';

import { getContactDetails } from '../../pages/api/getLocationDetails';

const MAX_STEPS = 2;
const Form = () => {
  const [formStep, setFormStep] = useState(0);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'all' });

  const completeFormStep = () => {
    setFormStep((currentStep) => currentStep + 1);
  };

  const renderButton = () => {
    if (formStep > 2) {
      return undefined;
    } else if (formStep >= 1) {
      return (
        <Button disabled={!isValid} type='submit'>
          Create Account!
        </Button>
      );
    } else {
      return (
        <Button disabled={!isValid} onClick={completeFormStep} type='button'>
          Next Step
        </Button>
      );
    }
  };

  //here we'll call the place id, get the details too
  const submitForm = async (values) => {
    window.alert(JSON.stringify(values, null, 2));
    getContactDetails(values.address);
    completeFormStep();
  };

  const goToPrevStep = () => {
    setFormStep((currentStep) => currentStep - 1);
  };

  const goToFirstStep = () => {
    setFormStep(0);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {formStep === 0 && (
        <motion.section
          className='formBox'
          style={{ maxWidth: 600 }}
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <p>
            Step {formStep + 1} of {MAX_STEPS}
          </p>
          <h1 style={{ textAlign: 'center' }}>Get Ready to Sign up!!!</h1>
          <h2 className='font-semibold text-3xl mb-8'>Personal Information</h2>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            className='text-input'
            {...register('firstName', { required: 'First name required!' })}
          />
          {errors.firstName && (
            <p className='text-red-600 text-sm mt-2'>
              {errors.firstName.message}
            </p>
          )}
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            className='text-input'
            {...register('lastName', { required: 'Last Name required!' })}
          />
          {errors.lastName && (
            <p className='text-red-600 text-sm mt-2'>
              {errors.lastName.message}
            </p>
          )}
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            {...register('Email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid Email address',
              },
            })}
          />
          {errors.Email && <p>{errors.Email.message}</p>}

          <div className='checkBox'>
            <span>
              I accept the{' '}
              <a className='text-blue-400 underline' href='/'>
                Terms and Conditions
              </a>
              .
            </span>
            <input
              style={{ margin: 'auto', width: '20px' }}
              type='checkbox'
              {...register('terms and conditions', { required: true })}
            />
          </div>

          {renderButton()}
        </motion.section>
      )}
      {formStep === 1 && (
        <motion.section
          className='formBox'
          style={{ maxWidth: 600 }}
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { scale: 0.8, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <p>
            Step {formStep + 1} of {MAX_STEPS}
          </p>
          <Button onClick={goToPrevStep} type='button'>
            Back
          </Button>
          <h1 style={{ textAlign: 'center' }}>
            Give me that Sweet Address!!!!
          </h1>
          <h2 className='font-semibold text-3xl mb-8'>Address</h2>
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            id='address'
            className='text-input'
            {...register('address', { required: 'address required!' })}
          />

          {errors.address && (
            <p className='text-red-600 text-sm mt-2'>
              {errors.address.message}
            </p>
          )}
          {renderButton()}
        </motion.section>
      )}

      {formStep >= 2 && (
        <section>
          <Button onClick={goToFirstStep} type='button'>
            Start Again
          </Button>
          <h1 style={{ textAlign: 'center' }}>Congratulations!</h1>
        </section>
      )}
    </form>
  );
};

export default Form;

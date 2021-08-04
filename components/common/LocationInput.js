import React, { useRef, useEffect, forwardRef } from 'react';
import useGoogleMapsApi from '../../pages/api/useGoogleMapsApi';
import { useForm } from 'react-hook-form';

///currently not being used Until i figure out how to integrate with the hook form state

const LocationInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  const autocompleteRef = useRef();
  const googleMapsApi = useGoogleMapsApi();
  const {
    register,
    formState: { errors, isValid },
  } = useForm({ mode: 'all' });

  useEffect(() => {
    if (googleMapsApi) {
      autocompleteRef.current = new googleMapsApi.places.Autocomplete(
        inputRef.current,
        { types: ['(cities)'] }
      );
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        // Do something with the resolved place here (ie store in redux state)
      });
    }
  }, [googleMapsApi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <label htmlFor='location'>Google Maps Location Lookup</label>
      <input
        name='location'
        aria-label='Search locations'
        ref={inputRef}
        {...register('address', { required: 'address required!' })}
        placeholder='Search....'
        autoComplete='off'
      
      />
      {errors.address && (
        <p className='text-red-600 text-sm mt-2'>{errors.address.message}</p>
      )}
    </form>
  );
});

export default LocationInput;

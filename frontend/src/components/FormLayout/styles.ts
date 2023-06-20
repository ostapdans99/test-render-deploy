import styled from 'styled-components';

export const FormWrapper = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  minWidth: '350px',
  width: '100%',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: 'var(--white)',
});

export const LogoWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const LogoTitle = styled('p')({
  fontFamily: 'var(--sigmar)',
  fontSize: 'var(--large-font)',
  fontWeight: 'bold',
  color: 'var(--dark-blue)',
});
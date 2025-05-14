import { useContext } from 'react';
import { AuthenticationContext } from '../../context';

const useAuth = () => useContext(AuthenticationContext);

export { useAuth };

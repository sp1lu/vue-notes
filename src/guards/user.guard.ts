/** Composables */
import { useAuth } from '../composables';

/** Guard */
export const userGuard = () => {
    const { user } = useAuth();     
    if (user.value) return true;
    return { path: '/home' }
}
import * as authService from '../services/auth.service';
export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const result = await authService.registerUser(email, password, name);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};

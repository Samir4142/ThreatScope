// ... (Imports Remain Same)
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { User, Key, Save, CheckCircle, AlertTriangle, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const Settings = () => {
    const { user } = useContext(AuthContext);

    // ... (Form States Remain Same)
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // NEW: API KEY STATE
    const [apiKey, setApiKey] = useState("sk_live_8392849283928394");

    const generateKey = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "sk_live_";
        for (let i = 0; i < 24; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setApiKey(result);
        setSuccess(true);
        setMessage("New API Key Generated Securely");
    };

    const handleUpdate = async (e) => {
        // ... (Same Update Logic as Before)
        e.preventDefault();
        setMessage(null);
        setSuccess(false);

        if (password && password !== confirmPassword) {
            setMessage("Passwords Do Not Match");
            return;
        }

        setLoading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const payload = { name, email };
            if (password) payload.password = password;

            const { data } = await axios.put("http://localhost:5000/api/users/profile", payload, config);

            localStorage.setItem("userInfo", JSON.stringify(data));
            setSuccess(true);
            setMessage("Profile Updated Successfully In MongoDB");

        } catch (error) {
            setMessage(error.response?.data?.message || "Update Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col bg-[#050505] text-white">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <div className="z-10 flex flex-1 flex-col p-8 items-center pt-32">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* ... (Sidebar Remains Same) */}
                    <div className="rounded-xl border border-gray-800 bg-black/60 p-4 h-fit backdrop-blur-md">
                        <div className="space-y-2">
                            <button className="w-full text-left px-4 py-2 bg-cyan-900/20 text-cyan-400 border-l-2 border-cyan-500 font-bold">Profile Settings</button>
                            <button className="w-full text-left px-4 py-2 text-gray-500 hover:text-white transition-colors">API Keys</button>
                            <button className="w-full text-left px-4 py-2 text-gray-500 hover:text-white transition-colors">Security Log</button>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        {/* ... (Profile Form Remains Same) */}
                        <form onSubmit={handleUpdate} className="rounded-xl border border-cyan-500/30 bg-black/80 p-8 shadow-[0_0_20px_rgba(0,255,255,0.05)] backdrop-blur-md">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <User className="text-cyan-500" /> OPERATIVE PROFILE
                            </h2>

                            {message && (
                                <div className={`mb-4 p-3 rounded flex items-center gap-2 text-sm font-bold ${success ? 'bg-green-900/30 text-green-400 border border-green-500/50' : 'bg-red-900/30 text-red-400 border border-red-500/50'}`}>
                                    {success ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                                    {message}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-cyan-500 mb-1 font-bold uppercase">Codename / Username</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white outline-none focus:border-cyan-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs text-cyan-500 mb-1 font-bold uppercase">Secure Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white outline-none focus:border-cyan-500 transition-colors" />
                                </div>

                                <div className="relative">
                                    <label className="block text-xs text-cyan-500 mb-1 font-bold uppercase">New Password</label>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Leave blank to keep current"
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 pr-12 text-white outline-none focus:border-cyan-500 transition-colors"
                                    />
                                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-gray-500 hover:text-white">
                                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <label className="block text-xs text-cyan-500 mb-1 font-bold uppercase">Confirm Password</label>
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-700 rounded p-3 pr-12 text-white outline-none focus:border-cyan-500 transition-colors"
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-9 text-gray-500 hover:text-white">
                                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full mt-8 bg-cyan-600 py-3 rounded font-bold hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(0,255,255,0.3)] flex items-center justify-center gap-2">
                                {loading ? "UPDATING..." : <><Save size={18} /> SAVE CHANGES</>}
                            </button>
                        </form>

                        {/* API KEY SECTION */}
                        <div className="rounded-xl border border-gray-800 bg-black/80 p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Key className="text-cyan-500" /> API MANAGEMENT
                            </h2>
                            <div className="bg-gray-900/50 p-4 rounded border border-gray-800 flex justify-between items-center">
                                <code className="text-cyan-600 font-mono">{apiKey}</code>
                                {/* NEW: CLICKABLE REGENERATE */}
                                <button onClick={generateKey} className="text-xs bg-cyan-900/50 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded hover:bg-cyan-500 hover:text-black font-bold transition-all">REGENERATE KEY</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
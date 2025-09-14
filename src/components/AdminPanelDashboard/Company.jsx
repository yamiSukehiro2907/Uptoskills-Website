import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {Building2, CheckCircle, Plus, Users, XCircle} from "lucide-react";

export default function Company() {
    const [newCompany, setNewCompany] = useState("");
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/companies");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const mappedData = data.map(company => ({
                    id: company.id,
                    name: company.company_name,
                    status: 'pending',
                    hires: 0,
                }));
                setCompanies(mappedData);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
                setCompanies([
                    {id: 1, name: "TCS", status: "pending", hires: 50},
                    {id: 2, name: "Infosys", status: "approved", hires: 70},
                    {id: 3, name: "Wipro", status: "rejected", hires: 20},
                    {id: 4, name: "Google", status: "approved", hires: 60},
                    {id: 5, name: "Microsoft", status: "approved", hires: 45},
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    const addCompany = () => {
        if (newCompany.trim()) {
            const newId = companies.length > 0 ? Math.max(...companies.map((c) => c.id)) + 1 : 1;
            setCompanies([
                ...companies,
                {id: newId, name: newCompany, status: "pending", hires: 0},
            ]);
            setNewCompany("");
        }
    };

    const handleCompanyApproval = (id, action) => {
        const updated = companies.map((company) =>
            company.id === id ? {...company, status: action} : company
        );
        setCompanies(updated);
    };

    if (loading) {
        return (
            <main className="p-4 sm:p-6 flex flex-col gap-6">
                <p>Loading companies...</p>
            </main>
        );
    }

    return (
        <main className="p-4 sm:p-6 flex flex-col gap-6">
            <motion.h2
                className="text-2xl font-bold text-foreground mb-6"
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
            >
                Manage Companies
            </motion.h2>

            <motion.div
                className="stat-card p-6 mb-6"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
            >
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        placeholder="Add new company..."
                        className="input-field flex-1"
                    />
                    <motion.button
                        onClick={addCompany}
                        className="btn-primary flex items-center gap-2"
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                    >
                        <Plus className="w-4 h-4"/>
                        Add Company
                    </motion.button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                    <motion.div
                        key={company.id}
                        className="stat-card p-6 cursor-pointer"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: index * 0.1}}
                        whileHover={{scale: 1.02, y: -4}}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-2xl bg-gradient-secondary">
                                <Building2 className="w-6 h-6 text-white"/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground">{company.name}</h3>
                                <span
                                    className={`px-2 py-1 rounded-xl text-xs font-medium ${
                                        company.status === "approved"
                                            ? "bg-success/20 text-success"
                                            : company.status === "rejected"
                                                ? "bg-destructive/20 text-destructive"
                                                : "bg-warning/20 text-warning"
                                    }`}
                                >
                  {company.status?.charAt(0).toUpperCase() + company.status?.slice(1)}
                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                            <Users className="w-4 h-4"/>
                            <span>{company.hires} Hires</span>
                        </div>

                        <div className="flex gap-2">
                            <motion.button
                                onClick={() => handleCompanyApproval(company.id, "approved")}
                                className="flex-1 btn-primary flex items-center justify-center gap-2"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <CheckCircle className="w-4 h-4"/>
                                Approve
                            </motion.button>
                            <motion.button
                                onClick={() => handleCompanyApproval(company.id, "rejected")}
                                className="flex-1 btn-secondary flex items-center justify-center gap-2"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <XCircle className="w-4 h-4"/>
                                Reject
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
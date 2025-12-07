import { useState } from 'react';
import { Trash2, Calculator, TrendingUp, Clock, BarChart3, AlertCircle } from 'lucide-react';

function WorkPulse() {
  const [workstations, setWorkstations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    tasksCompleted: '',
    totalTasks: '',
    hoursWorked: '',
    downtime: '',
    qualityScore: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateMetrics = (data) => {
    const tasksCompleted = parseFloat(data.tasksCompleted);
    const totalTasks = parseFloat(data.totalTasks);
    const hoursWorked = parseFloat(data.hoursWorked);
    const downtime = parseFloat(data.downtime);
    const qualityScore = parseFloat(data.qualityScore);

    // Calculate as per requirements
    const completionRate = totalTasks > 0 ? tasksCompleted / totalTasks : 0;
    const productiveHours = Math.max(0, hoursWorked - downtime);
    const productivityRate = hoursWorked > 0 ? productiveHours / hoursWorked : 0;
    const tasksPerHour = hoursWorked > 0 ? tasksCompleted / hoursWorked : 0;
    
    // Overall Efficiency Score formula:
    // 40% * completionRate + 30% * productivityRate + 30% * (qualityScore / 100)
    const overallEfficiency = (
      0.40 * completionRate +
      0.30 * productivityRate +
      0.30 * (qualityScore / 100)
    ) * 100;

    return {
      completionRate: (completionRate * 100).toFixed(1),
      productivityRate: (productivityRate * 100).toFixed(1),
      tasksPerHour: tasksPerHour.toFixed(2),
      productiveHours: productiveHours.toFixed(1),
      overallEfficiency: overallEfficiency.toFixed(1)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!formData.name || !formData.tasksCompleted || !formData.totalTasks || 
        !formData.hoursWorked || !formData.downtime || !formData.qualityScore) {
      alert('Please fill in all fields');
      return;
    }

    // Validate numeric fields are positive
    if (parseFloat(formData.tasksCompleted) < 0 || parseFloat(formData.totalTasks) <= 0 ||
        parseFloat(formData.hoursWorked) <= 0 || parseFloat(formData.downtime) < 0 ||
        parseFloat(formData.qualityScore) < 0 || parseFloat(formData.qualityScore) > 100) {
      alert('Please enter valid positive numbers (quality score must be 0-100)');
      return;
    }

    // Validate downtime doesn't exceed hours worked
    if (parseFloat(formData.downtime) > parseFloat(formData.hoursWorked)) {
      alert('Downtime cannot exceed hours worked');
      return;
    }

    const metrics = calculateMetrics(formData);
    const newWorkstation = {
      id: crypto.randomUUID(),
      ...formData,
      ...metrics
    };

    setWorkstations(prev => [...prev, newWorkstation]);

    // Reset form
    setFormData({
      name: '',
      tasksCompleted: '',
      totalTasks: '',
      hoursWorked: '',
      downtime: '',
      qualityScore: ''
    });
  };

  const handleDelete = (id) => {
    setWorkstations(prev => prev.filter(ws => ws.id !== id));
  };

  const getEfficiencyColor = (efficiency) => {
    const eff = parseFloat(efficiency);
    if (eff >= 80) return 'bg-green-50 border-green-400';
    if (eff >= 60) return 'bg-yellow-50 border-yellow-400';
    return 'bg-red-50 border-red-400';
  };

  const getEfficiencyBadgeColor = (efficiency) => {
    const eff = parseFloat(efficiency);
    if (eff >= 80) return 'bg-green-500 text-white';
    if (eff >= 60) return 'bg-yellow-500 text-gray-900';
    return 'bg-red-500 text-white';
  };

  const calculateAverageEfficiency = () => {
    if (workstations.length === 0) return 0;
    const sum = workstations.reduce((acc, ws) => acc + parseFloat(ws.overallEfficiency), 0);
    return (sum / workstations.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Calculator size={48} />
            WorkPulse
          </h1>
          <p className="text-white text-lg opacity-90">Workstation Efficiency Calculator</p>
        </div>

        {/* Average Efficiency Banner - Show at top */}
        {workstations.length > 0 && (
          <div className="bg-white rounded-xl shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-blue-600" size={40} />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Average Efficiency Across All Workstations</p>
                  <p className="text-4xl font-bold text-gray-800">{calculateAverageEfficiency()}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 font-medium">Total Workstations</p>
                <p className="text-3xl font-bold text-blue-600">{workstations.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Workstation Data</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Workstation Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="e.g., Station A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tasks Completed
                </label>
                <input
                  type="number"
                  name="tasksCompleted"
                  value={formData.tasksCompleted}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="0"
                  min="0"
                  step="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Tasks
                </label>
                <input
                  type="number"
                  name="totalTasks"
                  value={formData.totalTasks}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="0"
                  min="1"
                  step="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hours Worked
                </label>
                <input
                  type="number"
                  name="hoursWorked"
                  value={formData.hoursWorked}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="0"
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Downtime (hours)
                </label>
                <input
                  type="number"
                  name="downtime"
                  value={formData.downtime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="0"
                  min="0"
                  step="0.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Score (0-100)
                </label>
                <input
                  type="number"
                  name="qualityScore"
                  value={formData.qualityScore}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="0"
                  min="0"
                  max="100"
                  step="1"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <Calculator size={20} />
                Calculate Efficiency
              </div>
            </button>
          </form>
        </div>

        {/* Workstation Cards Grid */}
        {workstations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {workstations.map((ws) => (
              <div
                key={ws.id}
                className={`${getEfficiencyColor(ws.overallEfficiency)} border-2 rounded-xl shadow-lg p-6 transition-all hover:shadow-2xl hover:scale-[1.02]`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{ws.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-4 py-2 rounded-lg text-2xl font-bold ${getEfficiencyBadgeColor(ws.overallEfficiency)}`}>
                        {ws.overallEfficiency}%
                      </span>
                      <span className="text-sm text-gray-600 font-medium">Overall Efficiency</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(ws.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    aria-label="Delete workstation"
                    title="Delete workstation"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>

                {/* Metrics Boxes Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/80 rounded-lg p-4 shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={18} className="text-blue-600" />
                      <span className="text-xs text-gray-600 font-semibold uppercase">Completion Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{ws.completionRate}%</p>
                  </div>

                  <div className="bg-white/80 rounded-lg p-4 shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 size={18} className="text-blue-600" />
                      <span className="text-xs text-gray-600 font-semibold uppercase">Productivity</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{ws.productivityRate}%</p>
                  </div>

                  <div className="bg-white/80 rounded-lg p-4 shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={18} className="text-blue-600" />
                      <span className="text-xs text-gray-600 font-semibold uppercase">Tasks/Hour</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{ws.tasksPerHour}</p>
                  </div>

                  <div className="bg-white/80 rounded-lg p-4 shadow">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle size={18} className="text-blue-600" />
                      <span className="text-xs text-gray-600 font-semibold uppercase">Quality Score</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{ws.qualityScore}/100</p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div><span className="font-semibold">Tasks:</span> {ws.tasksCompleted}/{ws.totalTasks}</div>
                    <div><span className="font-semibold">Hours Worked:</span> {ws.hoursWorked}h</div>
                    <div><span className="font-semibold">Downtime:</span> {ws.downtime}h</div>
                    <div><span className="font-semibold">Productive:</span> {ws.productiveHours}h</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {workstations.length === 0 && (
          <div className="bg-white rounded-xl shadow-xl p-12 text-center">
            <Calculator className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Workstations Yet</h3>
            <p className="text-gray-500">Add your first workstation data above to start tracking efficiency!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkPulse;

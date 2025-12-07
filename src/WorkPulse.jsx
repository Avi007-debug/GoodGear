import { useState } from 'react';
import { Trash2, TrendingUp, Award, Clock, CheckCircle2, BarChart3 } from 'lucide-react';

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

    const completionRate = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;
    const productiveTime = hoursWorked - downtime;
    const productivity = productiveTime > 0 ? tasksCompleted / productiveTime : 0;
    const efficiency = (completionRate * (qualityScore / 100)) || 0;

    return {
      completionRate: completionRate.toFixed(1),
      productivity: productivity.toFixed(2),
      efficiency: efficiency.toFixed(1),
      productiveTime: productiveTime.toFixed(1)
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

    const metrics = calculateMetrics(formData);
    const newWorkstation = {
      id: Date.now(),
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
    if (eff >= 80) return 'bg-green-50 border-green-300';
    if (eff >= 60) return 'bg-blue-50 border-blue-300';
    if (eff >= 40) return 'bg-yellow-50 border-yellow-300';
    return 'bg-red-50 border-red-300';
  };

  const getEfficiencyBadgeColor = (efficiency) => {
    const eff = parseFloat(efficiency);
    if (eff >= 80) return 'bg-green-500 text-white';
    if (eff >= 60) return 'bg-blue-500 text-white';
    if (eff >= 40) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const calculateAverageEfficiency = () => {
    if (workstations.length === 0) return 0;
    const sum = workstations.reduce((acc, ws) => acc + parseFloat(ws.efficiency), 0);
    return (sum / workstations.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <BarChart3 size={48} />
            WorkPulse
          </h1>
          <p className="text-white text-lg opacity-90">Workstation Efficiency Calculator</p>
        </div>

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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Calculate Efficiency
            </button>
          </form>
        </div>

        {/* Average Efficiency Banner */}
        {workstations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-purple-600" size={32} />
                <div>
                  <p className="text-sm text-gray-600">Average Efficiency</p>
                  <p className="text-3xl font-bold text-gray-800">{calculateAverageEfficiency()}%</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Workstations</p>
                <p className="text-3xl font-bold text-gray-800">{workstations.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Workstation Cards Grid */}
        {workstations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workstations.map((ws) => (
              <div
                key={ws.id}
                className={`${getEfficiencyColor(ws.efficiency)} border-2 rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-xl`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{ws.name}</h3>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${getEfficiencyBadgeColor(ws.efficiency)}`}>
                      {ws.efficiency}% Efficiency
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(ws.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors"
                    aria-label="Delete workstation"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Metrics */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">
                      <strong>Completion Rate:</strong> {ws.completionRate}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">
                      <strong>Productivity:</strong> {ws.productivity} tasks/hr
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">
                      <strong>Productive Time:</strong> {ws.productiveTime} hrs
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-gray-600" />
                    <span className="text-sm text-gray-700">
                      <strong>Quality Score:</strong> {ws.qualityScore}/100
                    </span>
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div>Tasks: {ws.tasksCompleted}/{ws.totalTasks}</div>
                    <div>Hours: {ws.hoursWorked}</div>
                    <div>Downtime: {ws.downtime} hrs</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {workstations.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BarChart3 className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Workstations Yet</h3>
            <p className="text-gray-500">Add your first workstation data to start tracking efficiency!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkPulse;

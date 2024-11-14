import React from 'react';

const ReportRow = ({ report, onClick }) => (
    <tr>
        <button className="px-1 py-3 mt-1" onClick={() => onClick(report)}>
            <td className="px-6 py-2 border-b-2 border-blue-500">{report.user}</td>
        </button>
        <td className="px-3 py-3">{report.date}</td>
        <td className="px-3 py-3">{report.issueType}</td>
        <td className="px-3 py-3">{report.description}</td>
        <td className="px-3 py-3">{report.status}</td>
        <td className="px-10 py-3">
            <a href={`/path/to/attachments/${report.attachment}`} className="text-blue-600">{report.attachment}</a>
        </td>
        <td className="px-3 py-3">
            <div className="mt-2 relative">
                <select
                    value={report.status}
                    onChange={(e) => console.log(`Updated report ${report.id} status to ${e.target.value}`)}
                    className="px-4 py-2 mr-7 bg-gray-200 text-gray-700 rounded-md appearance-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
            </div>
        </td>
    </tr>
);

export default ReportRow;

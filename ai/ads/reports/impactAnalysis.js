async function analyzeImpact(data) {
    const insights = [];

    // Example logic: Detect factors slowing growth
    data.forEach((record) => {
        const { revenue, expenses } = record;
        const profit = revenue - expenses;

        if (profit < 0) {
            insights.push({
                issue: `Loss in month ${record.month}`,
                suggestion: 'Reduce expenses or increase revenue streams.',
            });
        }
    });

    return insights;
}

module.exports = { analyzeImpact };

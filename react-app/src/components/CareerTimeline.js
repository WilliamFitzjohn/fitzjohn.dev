import './styles/CareerTimeline.css'
import { useEffect, useState } from 'react';

function CareerTimeline({ jobs }) {
    const [timelineData, setTimelineData] = useState({ jobs: [], trackCount: 0, minTime: 0, maxTime: 0, years: [] });

    useEffect(() => {
        // Parse job dates and calculate timeline positions
        const parseDate = (dateStr) => {
            if (dateStr.toLowerCase().includes('current')) {
                return new Date();
            }
            const months = {
                'jan': 0, 'january': 0, 'feb': 1, 'february': 1, 'mar': 2, 'march': 2,
                'apr': 3, 'april': 3, 'may': 4, 'jun': 5, 'june': 5,
                'jul': 6, 'july': 6, 'aug': 7, 'august': 7, 'sep': 8, 'september': 8,
                'oct': 9, 'october': 9, 'nov': 10, 'november': 10, 'dec': 11, 'december': 11
            };
            
            const parts = dateStr.trim().toLowerCase().split(/[\s,]+/);
            const month = months[parts[0]] || 0;
            const year = parseInt(parts[1]) || new Date().getFullYear();
            return new Date(year, month);
        };

        const processedJobs = jobs.map(job => {
            const [startStr, endStr] = job.year.split('-').map(s => s.trim());
            const startDate = parseDate(startStr);
            const endDate = parseDate(endStr);
            
            return {
                ...job,
                startDate,
                endDate,
                startTime: startDate.getTime(),
                endTime: endDate.getTime()
            };
        });

        // Find earliest and latest dates
        const allDates = processedJobs.flatMap(j => [j.startTime, j.endTime]);
        const minTime = Math.min(...allDates);
        const maxTime = Math.max(...allDates);
        // Add 6 months buffer to prevent overflow on right side
        const bufferedMaxTime = maxTime + (180 * 24 * 60 * 60 * 1000);
        const totalTime = bufferedMaxTime - minTime;

        // Calculate positions and widths
        let timeline = processedJobs.map(job => {
            const width = ((job.endTime - job.startTime) / totalTime) * 100;
            return {
                ...job,
                left: ((job.startTime - minTime) / totalTime) * 100,
                width: width,
                isNarrow: width < 8 // Flag for jobs that are less than 8% of timeline width
            };
        });

        // Assign tracks to avoid overlaps
        // Sort by start time, then by end time
        timeline.sort((a, b) => a.startTime - b.startTime || a.endTime - b.endTime);
        
        const tracks = [];
        timeline.forEach(job => {
            // Find first available track
            let trackIndex = 0;
            while (true) {
                if (!tracks[trackIndex]) {
                    tracks[trackIndex] = [];
                }
                
                // Check if this job overlaps with any job in this track
                const overlaps = tracks[trackIndex].some(existingJob => {
                    return job.startTime < existingJob.endTime && job.endTime > existingJob.startTime;
                });
                
                if (!overlaps) {
                    tracks[trackIndex].push(job);
                    job.track = trackIndex;
                    break;
                }
                trackIndex++;
            }
        });

        // Generate year markers (skip first year)
        const startYear = new Date(minTime).getFullYear();
        const endYear = new Date(bufferedMaxTime).getFullYear();
        const years = [];
        for (let year = startYear + 1; year <= endYear; year++) {
            const yearTime = new Date(year, 0, 1).getTime();
            const position = ((yearTime - minTime) / totalTime) * 100;
            years.push({ year, position });
        }

        setTimelineData({ jobs: timeline, trackCount: tracks.length, minTime, maxTime: bufferedMaxTime, years });
    }, [jobs]);

    return (
        <div className='career-timeline-container'>
            <div className='timeline-track' style={{ minHeight: `${timelineData.trackCount * 100 + 40}px` }}>
                <div className='timeline-line' style={{ top: `${(timelineData.trackCount - 1) * 100 + 70}px` }}></div>
                
                {/* Additional track lines */}
                {Array.from({ length: timelineData.trackCount - 1 }, (_, i) => i + 1).map(trackIndex => {
                    const trackTop = (timelineData.trackCount - 1 - trackIndex) * 100 + 70;
                    
                    return (
                        <div 
                            key={trackIndex}
                            className='timeline-secondary-line'
                            style={{
                                top: `${trackTop}px`
                            }}
                        />
                    );
                })}

                {/* Year markers as gridlines */}
                {timelineData.years.map((yearData, index) => (
                    <div 
                        key={index}
                        className='timeline-year-marker'
                        style={{ 
                            left: `${yearData.position}%`,
                            height: `${timelineData.trackCount * 100 + 40}px`
                        }}
                    >
                        <div className='timeline-year-gridline'></div>
                        <span className='timeline-year-label'>{yearData.year}</span>
                    </div>
                ))}

                {timelineData.jobs.map((job, index) => (
                    <div 
                        key={index}
                        className={`timeline-job ${job.isNarrow ? 'timeline-job-narrow' : ''}`}
                        style={{
                            left: `${job.left}%`,
                            width: `${job.width}%`,
                            top: `${(timelineData.trackCount - 1 - job.track) * 100 + 20}px`
                        }}
                        title={job.isNarrow ? `${job.comp} - ${job.title}` : ''}
                    >
                        <div className='timeline-job-bar'>
                            <div className='timeline-job-content'>
                                <a href={job.imglink} target='_blank' rel='noopener noreferrer'>
                                    <img 
                                        src={`imgs/${job.img}`} 
                                        alt={job.comp}
                                        className='timeline-logo'
                                    />
                                </a>
                                {!job.isNarrow && (
                                    <div className='timeline-job-info'>
                                        <span className='timeline-job-title'>{job.comp}</span>
                                        <span className='timeline-job-role'>{job.title}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CareerTimeline;

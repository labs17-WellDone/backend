select * from pumps
select * from history
select * from sensors
select * from sensors
select * from organizations
select * from pad_counts
select * from pad_seconds

select * FROM history JOIN counts_1 from pad_counts JOIN pad_seconds ON date


select * FROM history JOIN counts_1 from pad_counts

select pad_counts.counts_1 from pad_counts join history

-- works but wrong
select * FROM history JOIN pad_counts JOIN pad_seconds ON date
-- works but wrong
select * FROM history JOIN pad_counts JOIN pad_seconds ON date where history.id=pad_counts.history_id AND pad_seconds.history_id


-- works but wrong
select * FROM history 
JOIN pad_counts 
JOIN pad_seconds  
where history.id=pad_counts.history_id 
AND history.id=pad_seconds.history_id



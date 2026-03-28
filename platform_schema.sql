-- PostgreSQL schema for AI Platform Dashboard

-- 1. Main platform details
drop table if exists platform_capabilities cascade;
drop table if exists platform_stats cascade;
drop table if exists platforms cascade;

CREATE TABLE platforms (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    mission TEXT,
    location TEXT,
    website TEXT,
    support_email TEXT,
    plan TEXT,
    uptime_streak TEXT,
    joined_at DATE,
    visibility TEXT DEFAULT 'public'
);

-- 2. Platform stats (one-to-one with platforms)
CREATE TABLE platform_stats (
    id SERIAL PRIMARY KEY,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    active_users BIGINT,
    integrated_models INTEGER,
    core_services INTEGER,
    active_projects INTEGER
);

-- 3. Platform capabilities (one-to-many with platforms)
CREATE TABLE platform_capabilities (
    id SERIAL PRIMARY KEY,
    platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
    capability TEXT NOT NULL
);

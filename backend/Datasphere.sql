USE master;
GO

-- Drop user in Datasphere Database if it exists.
USE [Datasphere];
IF EXISTS (SELECT * FROM sys.database_principals WHERE name = 'Datasphere_User')
BEGIN
    DROP USER [Datasphere_User];
END
GO

-- Drop Login if it exists
IF EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'Datasphere_User')
BEGIN
    DROP LOGIN [Datasphere_User];
END	
GO

-- Create new Login
CREATE LOGIN [Datasphere_User] WITH PASSWORD = 'Fullstack';
GO

-- Switch to the Datasphere database
USE [Datasphere];
GO

-- Create new user in Datasphere database
CREATE USER [Datasphere_User] FOR LOGIN [Datasphere_User];
GO

-- Grant db_owner role to the new user in the database
ALTER ROLE db_owner ADD MEMBER [Datasphere_User];
GO

-- Grant server role of sysadmin to the login
ALTER SERVER ROLE sysadmin ADD MEMBER [Datasphere_User];
GO

-- Kill existing connections to the Datasphere database
USE master;
GO

DECLARE @databaseName NVARCHAR(50) = N'Datasphere';
DECLARE @killcommand NVARCHAR(MAX) = '';

SELECT @killcommand = @killcommand + 'KILL ' + CONVERT(VARCHAR(5), session_id) + ';'
FROM sys.dm_exec_sessions
WHERE database_id = DB_ID(@databaseName);

EXEC sp_executesql @killcommand;
GO

-- Drop the Datasphere database if it exists
IF EXISTS(SELECT * FROM sys.databases WHERE NAME = 'Datasphere')
BEGIN
    DROP DATABASE Datasphere;
END
GO

-- Create Datasphere database
CREATE DATABASE Datasphere;
GO

USE Datasphere;
GO

-- Create Customer Table
CREATE TABLE dbo.Customer (
    customerID INT IDENTITY(1,1) PRIMARY KEY,
    customerName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(20) NOT NULL,
    preferredLunch VARCHAR(255) NULL
);

-- Create Child Table
CREATE TABLE dbo.Child (
    childID INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255),
    school VARCHAR(255),
    interest VARCHAR(255),
    customerID INT,
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);

-- Drop and Create Program Table
DROP TABLE IF EXISTS dbo.Program;
CREATE TABLE dbo.Program (
    programID INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
	programPrice DECIMAL(10,2)
);

DROP TABLE IF EXISTS dbo.booking;
CREATE TABLE dbo.booking(
    bookingID INT IDENTITY(1,1) PRIMARY KEY,
	customerid int,
    ProgrammeName VARCHAR(255) NOT NULL,
	datetime Varchar(255) not null,
	selectDatetime datetime not null,
	preferredLunch varchar(255) not null
	FOREIGN KEY (customerID) REFERENCES Customer(customerID)
	
);

-- Create Subscriptions Table (to store email subscriptions)
DROP TABLE IF EXISTS dbo.Subscriptions;
CREATE TABLE dbo.Subscriptions (
  subscriptionID INT IDENTITY(1,1) PRIMARY KEY,
  email VARCHAR(255) NOT NULL
);


-- Insert Sample Data into Customer Table
INSERT INTO dbo.Customer (customerName, email, password, contactNumber, preferredLunch)
VALUES 
    ('Jon', 'jon@gmail.com', '123', '89224444', NULL),
    ('Alice', 'alice@gmail.com', '456', '88445566', 'Vegetarian'),
    ('Sam', 'sam@hotmail.com', '789', '87332211', 'Vegan');

-- Insert Sample Data into Child Table
INSERT INTO dbo.Child (name, school, interest, customerID)
VALUES 
    ('Joy', 'ABC School', 'reading', 1),
    ('Lily', 'XYZ School', 'drawing', 2),
    ('Max', 'DEF School', 'sports', 3);

-- Insert Sample Data into Program Table
INSERT INTO dbo.Program (name, description, programPrice)
VALUES 
    ('Public Speaking', 'Our tiered public speaking workshops are thoughtfully designed to transform your child into a seasoned stage storyteller through comprehensive training.', 500.00),
    ('Creative Writing', 'A program to nurture and develop young creative writers through workshops and interactive writing sessions.', 700.00),
    ('Math Enrichment', 'Designed to challenge and inspire students with engaging math activities and advanced concepts.', 900.00);



-- Insert Sample data into Booking

INSERT INTO dbo.booking (customerID, ProgrammeName, datetime, selectDatetime, preferredLunch)
VALUES
(1, 'Public Speaking', '2023-11-12 09:00:00', '2023-11-12 09:00:00', 'Vegetarian'),
(2, 'Public Speaking', '2023-12-05 10:00:00', '2023-12-05 10:00:00', 'Vegan'),
(3, 'Math Enrichment', '2023-11-20 08:30:00', '2023-11-20 08:30:00', 'Gluten-Free');

-- Insert Sample Data into Subscriptions Table
INSERT INTO dbo.Subscriptions (email)
VALUES 
    ('ongapple1@example.com'),
    ('user2@example.com'),
    ('user3@example.com'),
    ('user4@example.com');

-- Select Data
SELECT * FROM dbo.Customer;
SELECT * FROM dbo.Child;
SELECT * FROM dbo.Program;
SELECT * FROM dbo.booking;

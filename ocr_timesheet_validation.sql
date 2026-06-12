-- Scenario: Optical Character Recognition validation for Washington State caregiver timesheets

-- Context: Optical Character Recognition converted handwritten timesheets into structured data

-- Discrepancy Found: Worked hours were incorrectly captured as PTO by the OCR and deducted from caregivers' PTO balance

-- Role: QA SME validating OCR accuracy against original scanned timesheet images

-- SQL Dialect: T-SQL (Microsoft SQL Server)

SELECT
    us.[ID] as [USER ID],
    us.[FIRST NAME],
    us.[LAST NAME],
    ts.[ID] as [TIMESHEET ID],
	ts.[USER ID] as [TIMESHEET USER ID],
    ts.[MONDAY HOURS],
    ts.[TUESDAY HOURS],
    ts.[WEDNESDAY HOURS],
    ts.[THURSDAY HOURS],
    ts.[FRIDAY HOURS],
	ts.[TOTAL] AS [TOTAL WEEK HOURS WORKED],
    ts.[PTO] AS [TOTAL WEEK HOURS PTO],
	ts.[SUBMIT DATE]
FROM [PROD].[OCR].[TIMESHEETS] ts
INNER JOIN [PROD].[USERS] us
    ON ts.[USER ID] = us.[ID]
WHERE ts.[SUBMIT DATE] BETWEEN '2022-01-01' AND '2022-01-31';


-- Validation approach:
-- Queried OCR-extracted data and manually compared results against original timesheet images

-- Outcome:
-- Identified misclassification of worked hours as PTO in OCR processing






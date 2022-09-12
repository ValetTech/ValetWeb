CREATE TABLE [ValetAPI.Models].[Sitting](
	[Id] [int] NOT NULL,
	[Capacity] [int] NULL,
	[Type] [nvarchar](4000) NULL,
	[StartTime] [datetimeoffset](4) NULL,
	[EndTime] [datetimeoffset](4) NULL,
	[VenueId] [int] NULL,
 CONSTRAINT [PK_Sitting] PRIMARY KEY CLUSTERED 
(
	[Id]
)
)

-- Property 'Areas' is a list (1..* relationship), so it's been added as a secondary table
-- Property 'Reservations' is a list (1..* relationship), so it's been added as a secondary table
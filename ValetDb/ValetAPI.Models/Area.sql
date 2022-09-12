CREATE TABLE [ValetAPI.Models].[Area](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](4000) NOT NULL,
	[Description] [nvarchar](4000) NULL,
	[VenueId] [int] NULL,
 CONSTRAINT [PK_Area] PRIMARY KEY CLUSTERED 
(
	[Id]
)
)

-- Property 'Tables' is a list (1..* relationship), so it's been added as a secondary table
-- Property 'Sittings' is a list (1..* relationship), so it's been added as a secondary table
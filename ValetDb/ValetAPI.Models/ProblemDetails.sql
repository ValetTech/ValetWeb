CREATE TABLE [ValetAPI.Models].[ProblemDetails](
	[Id] [int] NOT NULL,
	[Type] [nvarchar](4000) NULL,
	[Title] [nvarchar](4000) NULL,
	[Status] [int] NULL,
	[Detail] [nvarchar](4000) NULL,
	[Instance] [nvarchar](4000) NULL,
 CONSTRAINT [PK_ProblemDetails] PRIMARY KEY CLUSTERED 
(
	[Id]
)
)

-- Property 'AdditionalProperties' is a list (1..* relationship), so it's been added as a secondary table
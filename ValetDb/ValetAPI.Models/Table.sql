CREATE TABLE [ValetAPI.Models].[Table](
	[Id] [int] NOT NULL,
	[Type] [nvarchar](4000) NULL,
	[Capacity] [int] NULL,
	[AreaId] [int] NULL,
 CONSTRAINT [PK_Table] PRIMARY KEY CLUSTERED 
(
	[Id]
)
)

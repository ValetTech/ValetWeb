CREATE TABLE [ValetAPI.Models].[AreaToTables](
	[AreaId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
 CONSTRAINT [FK_AreaToTables_Area] FOREIGN KEY([AreaId])
REFERENCES [ValetAPI.Models].[Area] ([Id]),
 CONSTRAINT [FK_AreaToTables_Table] FOREIGN KEY([TableId])
REFERENCES [ValetAPI.Models].[Table] ([Id])
)

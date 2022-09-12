CREATE TABLE [ValetAPI.Models].[AreaToSittings](
	[AreaId] [int] NOT NULL,
	[SittingId] [int] NOT NULL,
 CONSTRAINT [FK_AreaToSittings_Area] FOREIGN KEY([AreaId])
REFERENCES [ValetAPI.Models].[Area] ([Id]),
 CONSTRAINT [FK_AreaToSittings_Sitting] FOREIGN KEY([SittingId])
REFERENCES [ValetAPI.Models].[Sitting] ([Id])
)

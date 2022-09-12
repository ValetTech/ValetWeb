CREATE TABLE [ValetAPI.Models].[ReservationToTables](
	[ReservationId] [int] NOT NULL,
	[TableId] [int] NOT NULL,
 CONSTRAINT [FK_ReservationToTables_Reservation] FOREIGN KEY([ReservationId])
REFERENCES [ValetAPI.Models].[Reservation] ([Id]),
 CONSTRAINT [FK_ReservationToTables_Table] FOREIGN KEY([TableId])
REFERENCES [ValetAPI.Models].[Table] ([Id])
)

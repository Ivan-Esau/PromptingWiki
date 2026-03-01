import type { Paper } from '../../domain/models/paper';

export interface PaperRepository {
  listPapers(): Promise<Paper[]>;
}

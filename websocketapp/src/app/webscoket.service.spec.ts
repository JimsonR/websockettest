import { TestBed } from '@angular/core/testing';

import { WebsocketService } from './webscoket.service';

describe('WebscoketService', () => {
  let service: WebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
import { ProfesorPage } from './profesor.page';

describe('ProfesorPage', () => {
  let component: ProfesorPage;
  let fixture: ComponentFixture<ProfesorPage>;
<<<<<<< HEAD
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      declarations: [ProfesorPage],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

=======

  beforeEach(() => {
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
    fixture = TestBed.createComponent(ProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
<<<<<<< HEAD

  it('should generate a personal QR code', () => {
    component.generateQRCode();
    expect(component.qrData).toContain('PROFESOR|Profesor');
    expect(component.isQRCodeVisible).toBe(true); // Cambiado a `toBe(true)`
  });

  it('should register a new subject', () => {
    component.nuevaAsignatura = { id: '', nombre: 'Matemáticas', seccion: 'A1' };
    component.registrarAsignatura();
    expect(component.asignaturas.length).toBe(1);
    expect(component.asignaturas[0].nombre).toBe('Matemáticas');
  });

  it('should generate a QR code for a subject', () => {
    const asignatura = { id: '1', nombre: 'Historia', seccion: 'B2' };
    component.generarQRAsignatura(asignatura);
    expect(component.qrData).toContain('ASIGNATURA|Historia|SECCION|B2');
    expect(component.isQRCodeVisible).toBe(true); // Cambiado a `toBe(true)`
  });

  it('should hide the QR code', () => {
    component.isQRCodeVisible = true;
    component.hideQRCode();
    expect(component.isQRCodeVisible).toBe(false); // Cambiado a `toBe(false)`
  });

  it('should navigate to contact page', () => {
    component.goToContacto();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/contacto'], {
      queryParams: { from: 'profesor', usuario: 'Profesor' },
    });
  });

  it('should navigate to login page on logout', () => {
    component.logOut();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
=======
>>>>>>> c7382611ed3b0ad9493963a20194cec4a7cb8bb3
});
